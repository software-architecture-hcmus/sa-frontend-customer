import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../utils/apiClient";
import Url from "../../const/Url";
import { errorNotification } from "../../utils/notification";
import Spinner from "../../components/Spinner";
import EventDetail from "./detail";

const Event = () => {
    const { id } = useParams();
    const [event, setEvent] = useState({});
    const [games, setGames] = useState([]);
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
                setEvent(event);
                const fetchGame = await apiClient.get(Url.GET_GAMES_OF_EVENT.replace(":id", id));
                if (!fetchGame || fetchGame.status !=200 || fetchGame?.data?.data)
                {
                    setGames([])
                }
                const game = fetchGame.data.data;
                setGames(game);
            }
            catch(error)
            {
                errorNotification(error.message);
                setGames([])
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
                <EventDetail event={event} games={games} />:
                <div> No data</div>
            )
        ) : (
            <Spinner />
        )
    );
}

export default Event;