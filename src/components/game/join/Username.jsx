import { usePlayerContext } from "../../../contexts/player"
import UserContext from "../../../contexts/UserContext";

import Form from "../../Form"
import Button from "../../Button"
import Input from "../../Input"
import { useEffect, useState, useContext } from "react"
import { useSocketContext } from "../../../contexts/socket"
import { useNavigate } from "react-router-dom"

export default function Username({ gameID }) {
  const { socket } = useSocketContext()
  const { player, dispatch } = usePlayerContext()
  const navigate = useNavigate()
  const user = useContext(UserContext);
  const [username, setUsername] = useState("")

  const handleJoin = () => {
    console.log("JOIN");
    socket.emit("player:join", { username: username, gameID: gameID, id: user.uid })
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleJoin()
    }
  }

  useEffect(() => {
    socket.on("game:successJoin", ({ id }) => {
    console.log("successJoin");

      if(id === user.uid)
      {
        dispatch({
          type: "LOGIN",
          payload: username,
        })
        navigate(`/game/quiz/play/${gameID}`)
      }
      
    })
    socket.on("manager:newPlayer", (player) => {
      console.log("player: ", player)
    });
    return () => {
      socket.off("game:successJoin")
      socket.off("manager:newPlayer")

    }
  }, [username])

  return (
    <Form>
      <Input
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Usernname here"
      />
      <Button onClick={() => handleJoin()}>Submit</Button>
    </Form>
  )
}
