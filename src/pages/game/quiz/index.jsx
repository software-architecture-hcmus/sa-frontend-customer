import logo from "../../../assets/logo.svg"
import { useEffect } from "react"
import { usePlayerContext } from "../../../contexts/player"
import Username from "../../../components/game/join/Username"
import { useSocketContext } from "../../../contexts/socket"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import "../../../styles/globals.css"
export default function Quizjoin() {
  const { player, dispatch } = usePlayerContext()
  const { socket } = useSocketContext()
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch({ type: "JOIN", payload: id })
  }, [id])

  // useEffect(()=>{
  //   if(player && id)
  //   {
  //     navigate(`/games/detail/${id}`)
  //   }
  // }, [player,id])

  useEffect(() => {
    socket.on("game:errorMessage", (message) => {
      toast.error(message)
    })

    return () => {
      socket.off("game:errorMessage")
    }
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute h-full w-full overflow-hidden">
        <div className="absolute -left-[15vmin] -top-[15vmin] min-h-[75vmin] min-w-[75vmin] rounded-full bg-primary/15"></div>
        <div className="absolute -bottom-[15vmin] -right-[15vmin] min-h-[75vmin] min-w-[75vmin] rotate-45 bg-primary/15"></div>
      </div>

      <img src={logo} className="mb-6 h-32" alt="logo" />

      {player && <Username gameID = {id}/>}
    </section>
  )
}