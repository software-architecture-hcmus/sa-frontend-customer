import Button from "../Button"
import background from "../../assets/background.webp"
import { usePlayerContext } from "../../contexts/player"
import { useSocketContext } from "../../contexts/socket"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function GameWrapper({ children, statusName }) {
  const { socket } = useSocketContext()
  const { player, dispatch } = usePlayerContext()
  const navigate = useNavigate()

  const [questionState, setQuestionState] = useState()

  useEffect(() => {
    socket.on("game:kick", () => {
      dispatch({
        type: "LOGOUT",
      })

      navigate("/")
    })

    socket.on("game:updateQuestion", ({ current, total }) => {
      setQuestionState({
        current,
        total,
      })
    })

    return () => {
      socket.off("game:kick")
      socket.off("game:updateQuestion")
    }
  }, [])

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between bg-orange-100">
      <div className="fixed left-0 top-0 -z-10 h-full w-full bg-orange-600 opacity-70">
        <img
          className="pointer-events-none h-full w-full object-cover opacity-60"
          src={background}
          alt="background"
        />
      </div>

      <div className="flex w-full justify-between p-4">
        {questionState && (
          <div className="shadow-inset flex items-center rounded-md bg-white p-2 px-4 text-lg font-bold text-black">
            {`${questionState.current} / ${questionState.total}`}
          </div>
        )}
      </div>

      {children}

        {
          statusName && statusName!='FINISH' && 
          <div className="z-50 flex items-center justify-between bg-white px-4 py-2 text-lg font-bold text-white">
          <p className="text-gray-800">{!!player && player.username}</p>
          <div className="rounded-sm bg-gray-800 px-3 py-1 text-lg">
            {!!player && player.points}
          </div>
        </div>
        }
      
    </section>
  )
}
