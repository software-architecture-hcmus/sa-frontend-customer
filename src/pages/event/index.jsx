import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import Url from "../../const/Url";
import { errorNotification } from "../../utils/notification";
import Spinner from "../../components/Spinner";

const Event = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [game, setGame] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const fetchEvent = async()=>{
            try
            {
                setLoading(true);
                const result = await apiClient.get(Url.GET_EVENT_DETAIL.replace(":id", id));
                if(!result || result.status!= 200 || result?.data?.data)
                {
                    setEvent({})
                }
                const event = result.data.data;
                console.log("event: ", event);
                const fetchGame = await apiClient.get(Url.GET_GAMES_OF_EVENT.replace(":id", id));
                console.log(fetchGame);
                if (!fetchGame || fetchGame.status !=200 || fetchGame?.data?.data)
                {
                    setGame([])
                }
                const game = fetchGame.data.data;
                setGame(game);
            }
            catch(error)
            {
                errorNotification(error.message);
                setGame([])
                setEvent({})
            }
            finally {
                setLoading(false);
            }

        }
        fetchEvent();
    },[id])
    return (
        !loading ? (
                (   event?
                <div>Event details here</div>:
                <div> No data</div>
            )
        ) : (
            <Spinner />
        )
    );
}

export default Event;