import { useEffect, useState, useContext } from "react"
import UserContext from "../../../contexts/UserContext";

export default function Podium({ data: { subject, top } }) {
  const [player, setPlayer] = useState({});
  const user = useContext(UserContext);
  useEffect(() => {
    console.log(top);
    if (top) {
      const userScore = top.find(element => element.customer_id === user.uid);
      console.log(userScore);
      setPlayer(userScore);
    }
  }, [user, top]);

  return (
    <>
      <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-between bg-orange-100">
        <h2 className="anim-show text-center text-3xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-5xl">
          {subject}
        </h2>

        <div
          className={`grid w-full max-w-[800px] flex-1 items-end justify-center justify-self-end overflow-y-hidden overflow-x-visible`}
        >
        (player && <div className="player-score">
          <h2 className="text-3xl font-bold text-center">Your Score</h2>
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-2xl font-bold">{player.username}</p>
            <p className="text-4xl font-bold text-green-500">{player.score}</p>
          </div>
        </div>)
         
        </div>
      </section>
    </>
  )
}
