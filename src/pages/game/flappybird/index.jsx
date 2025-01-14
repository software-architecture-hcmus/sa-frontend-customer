import React, { useEffect, useState,useContext } from "react";
import { initGame } from "./flappyBird";
import UserContext from "../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import apiClient from "../../../utils/apiClient";
import Url from "../../../const/Url";
import VoucherCart  from "../../../components/VoucherCard"
import { errorNotification } from "../../../utils/notification";
import AskGameTurnBtn from "../../../components/AskGameTurnBtn";
import Button from "../../../components/Button";
import { Typography } from "antd";
import ShareToFacebook from "../../../components/ShareToFacebook";
const GameComponent = () => {
  const { id } = useParams();
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [gameTurn, setGameTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [maxScore, setMaxScore] = useState(0);
  const [voucher, setVoucher] = useState(null)
  const user = useContext(UserContext);

  useEffect(()=>{
    const fetchGameFlappyBird = async()=>{
      const result = await apiClient.get(Url.GET_GAME_TURN.replace(":id", id))
      if(!result || result.status!= 200 || !result?.data?.data)
        {
          setGameTurn(0)
          setMaxScore(0)
        }
      const data = result?.data?.data
      console.log(data);
      setGameTurn(Number(data?.turn) ? Number(data?.turn) : 0)
      setMaxScore(Number(data?.maxScore) ? Number(data?.maxScore) : 0)
      if(data.voucher)
      {
        setVoucher(data.voucher)
      }
    }
    if(id){
      try{
        fetchGameFlappyBird()
      }catch(error)
      {
        console.log(error);
      }
    }
  },[id])

  const updateGameTurn = async()=>{
    const result = await apiClient.put(Url.UPDATE_GAME_TURN,{
      gameID: id,
      turn: gameTurn-1
    })
    if(!result || result.status!= 200 || !result?.data?.data)
      {
        setGameTurn(0)
      }
      else
      {
        setGameTurn(gameTurn - 1)
      }
  }

  const handleStart = async() => {
    try{
      await updateGameTurn();
      setStart(true)
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  // Hàm restart game
  const handleRestart = async () => {
    try{
      await updateGameTurn()
      setGameOver(false);
      setScore(0); // Reset điểm số
      setStart(true); // Bắt đầu lại game
    }
    catch(error)
    {
      console.log(error);
    }

  };

  // Hàm Claim Voucher
  const handleClaimVoucher = async () => {
    try{
      const result = await apiClient.post(Url.CREATE_VOUCHER_FOR_FLAPPY_BIRD,
        {
          customer_id: user.uid,
          score: maxScore,
          gameID: id
        }
      )
      console.log(result);
      if(!result || result.status!= 201 || !result?.data?.data)
        {
          setVoucher(null)
          errorNotification("Your points are not enough to redeem a Voucher")
        }
        else
        {
          setVoucher(result?.data?.data)
        }
    }
    catch(error)
    {
      console.log(error);
    }
  };

  // Hook để khởi tạo game khi start là true
  useEffect(() => {
    if (start && !gameOver) {
      initGame({ canvasId: "gameCanvas", score, setScore, setGameOver });
    }
  }, [start, gameOver]);

  useEffect(()=>{
    if(gameOver)
    {
      const updateScore = async()=>{
        const result = await apiClient.put(Url.UPDATE_SCORE_GAME,{
          customer_id: user.uid,
          score: score,
          gameID: id
        })
        if(!result || result.status!= 200 || !result?.data?.data)
          {
            setGameTurn(0)
          }
          else
          {
            setMaxScore(score)
          }
      }
      if(id && score > maxScore){
        try{
          updateScore()
        }catch(error)
        {
          console.log(error);
        }
      }
    }
  },[gameOver])
  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="absolute top-4 right-4">
        <Typography style={{alignItems: "center"}}>Want more turn?</Typography>
        <div>
          <ShareToFacebook game_id={id}/>
          <AskGameTurnBtn game_id={id} />
        </div>
      </div>
      {/* Canvas game */}
      {!gameOver && start ? (
        <canvas id="gameCanvas" />
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Game Start</h2>
          <p>Max Score: {maxScore}</p>
          <p>Number of plays remaining: {gameTurn}</p>
          {voucher &&
           <div>
              <p>Your Voucher</p>
              <VoucherCart value= {voucher.value} expiry_date= {voucher.expiry_date} description= {voucher.description} />
            </div>
          }
          <div className="mt-4 flex space-x-4 justify-center">
            <button
              id="startButton"
              className="bg-yellow-400 text-black rounded-lg px-6 py-2"
              onClick={handleStart}
              disabled = {gameTurn <=0}
            >
              Start Game
            </button>
            {!voucher && <button
              onClick={handleClaimVoucher}
              className="px-4 py-2 bg-blue-400 text-black rounded-lg"
            >
              Claim Voucher
            </button>}
            
          </div>
        </div>

        
      )}

      {/* Hiển thị UI khi game kết thúc */}
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Game Over</h2>
          <p>Score: {score}</p>
          <p>Max Score: {maxScore}</p>
          <p>Number of plays remaining: {gameTurn}</p>
          {voucher &&
              <div>
                  <p>Your Voucher</p>
                  <VoucherCart value= {voucher.value} expiry_date= {voucher.expiry_date} description= {voucher.description} />
                </div>
              }
          <div className="mt-4 flex space-x-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-green-400 text-black rounded-lg"
              disabled={gameTurn<=0}
            >
              Restart Game
            </button>

            {!voucher && 
            <button
              onClick={handleClaimVoucher}
              className="px-4 py-2 bg-blue-400 text-black rounded-lg"
            >
              Claim Voucher
            </button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameComponent;
