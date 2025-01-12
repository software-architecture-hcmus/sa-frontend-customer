import { Row, Col } from "antd";
import EventCard from "../../components/EventCard";
import Url from "../../const/Url";
import { useEffect, useState, useContext } from "react";
import apiClient from "../../utils/apiClient";
import {
  errorNotification,
  successNotification,
} from "../../utils/notification";
import UserContext from "../../contexts/UserContext";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);

  const subscribeEvent = async (event) => {
    try {
      const response = await apiClient.post(Url.SUBSCRIBE_EVENT, {
        event_id: event.id,
        customer_id: user.uid,
      });
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === event.id ? { ...e, isSubscribed: true } : e
        )
      );
      successNotification(response.data.message);
    } catch (error) {
      errorNotification(error.message);
    }
  };

  const unsubscribeEvent = async (event) => {
    try {
      const response = await apiClient.post(Url.UNSUBSCRIBE_EVENT, {
        event_id: event.id,
        customer_id: user.uid,
      });
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.id === event.id ? { ...e, isSubscribed: false } : e
        )
      );
      successNotification(response.data.message);
    } catch (error) {
      errorNotification(error.message);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const responseEvents = await apiClient.get(Url.GET_EVENTS);
        const responseSubscribedEvents = await apiClient.get(
          Url.GET_MY_FAVOURITE_EVENTS.replace(":id", user.uid)
        );
        const events = responseEvents.data.data;
        const subscribedEventIds = responseSubscribedEvents.data.data.map(
          (subscribedEvent) => subscribedEvent.event.id
        );
        const eventsData = events.map((event) => {
          return {
            ...event,
            isSubscribed: subscribedEventIds.includes(event.id),
          };
        });
        setEvents(eventsData);
      } catch (error) {
        errorNotification(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Row gutter={[16, 16]}>
      {events.map((event) => (
        <Col key={event.id} xs={24} sm={12} md={8} lg={6}>
          <EventCard
            event={event}
            onSubscribe={event.isSubscribed ? unsubscribeEvent : subscribeEvent}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Home;
