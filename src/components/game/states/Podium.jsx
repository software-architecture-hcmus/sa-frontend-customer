import { useEffect, useState, useContext } from "react"
import UserContext from "../../../contexts/UserContext";
import { errorNotification } from "../../../utils/notification";
import Spinner from "../../Spinner";
import apiClient from "../../../utils/apiClient";
import Url from "../../../const/Url";
import VoucherCard from "../../VoucherCard";
export default function Podium({ data: { subject, top } }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(999);
  const [voucher, setVoucher] = useState({});
  const user = useContext(UserContext);
  useEffect(() => {
    if (top) {
      const userScore = top.find(element => element.customer_id === user.uid);
      const currentPosition = top.findIndex(element => element.customer_id === user.uid)
      if (currentPosition !== -1) {
        setPosition(currentPosition);
        userScore['position'] = currentPosition
      }
      else
      {
        userScore['position'] = position
      }
      setPlayer(userScore);
    }
  }, [user, top]);
  
  useEffect(()=>{
    const createVoucher = async()=>{
      if(player)
      {
        setLoading(true)
        try {
          const response = await apiClient.post(Url.CREATE_VOUCHER_FOR_QUIZ_GAME, {
            ...player
          });
          const voucher = response.data.data;
          if(voucher)
          {
            setVoucher(voucher)
          }
        }
         catch (error) {
          errorNotification(error.message);
        } finally {
          setLoading(false);
        }
      }
    }
    if (player) {
      createVoucher();
    }
  },[player])
  return (
    <>
      <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-between bg-orange-100">
        <h2 className="anim-show text-center text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
          {subject}
        </h2>

        <div
          className={`grid w-full max-w-[800px] flex-1 items-center justify-center overflow-y-hidden overflow-x-visible`}
        >
         {loading ? (
            <Spinner />
          ) : (
            player && (
              <> 
              <div className="player-score">
                <div className="flex flex-col items-center justify-center mt-4">
                  <p className="text-2xl font-bold">{player.username}</p>
                  <p className="text-4xl font-bold text-green-500">{player.score}</p>
                </div>
              </div>
              {
                voucher ?
                <div className="player-voucher">
                  <h4 className="text-2xl font-bold text-center">Your Voucher</h4>
                  <VoucherCard value={voucher.value} expiry_date = {voucher.expiry_date} description = {voucher. expiry_date}/>
                </div>
                :
                <div className="player-voucher">
                  <p className="text-2xl font-bold text-center">You did not win the voucher</p>
                </div>
              }
              </>
             
            )
          )}
        </div>
      </section>
    </>
  )
}
