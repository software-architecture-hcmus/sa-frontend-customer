import GameWrapper from "../../../../components/game/GameWrapper"
import { GAME_STATES, GAME_STATE_COMPONENTS } from "../../../../constants"
import { usePlayerContext } from "../../../../contexts/player"
import { useSocketContext } from "../../../../contexts/socket"
import { createElement, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

export default function QuizPlay() {
  const navigate = useNavigate()
  const { id } = useParams();
  const { socket } = useSocketContext()
  const { player, dispatch } = usePlayerContext()

  useEffect(() => {
    if (!player) {
        navigate("/")
    }
  }, [])

  const [state, setState] = useState(GAME_STATES)
  
  useEffect(() => {
    socket.on("game:status", (status) => {
      setState({
        ...state,
        status: status,
        question: {
          ...state.question,
          current: status.question,
        },
      })
    })

    socket.on("game:reset", () => {
    navigate("/")
      dispatch({ type: "LOGOUT" })
      setState(GAME_STATES)

      toast("The game has been reset by the host")
    })

    return () => {
      socket.off("game:status")
      socket.off("game:reset")
    }
  }, [state])

  return (
    <GameWrapper>
      {GAME_STATE_COMPONENTS[state.status.name] &&
        createElement(GAME_STATE_COMPONENTS[state.status.name], {
          data: state.status.data,
        })}
    </GameWrapper>
  )
}
