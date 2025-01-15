import Header from "./Header";
import { Layout } from "antd";
import Sidebar from "./SideBar";
const { Content } = Layout;
import { useEffect, useContext } from "react";
import socket from "../utils/socket";
import {
  SOCKET_CREATE_EVENT_NOTIFICATION,
  SOCKET_JOIN_USER_ROOM,
} from "../const/Socket";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import apiClient from "../utils/apiClient";
import Url from "../const/Url";
import { errorNotification, infoNotification } from "../utils/notification";

const PrivateContainer = ({ children, title }) => {
  const user = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (socket.connected) {
      console.log("Socket is already connected");
      socket.emit(SOCKET_JOIN_USER_ROOM, { id: user.uid });
    }
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on(SOCKET_CREATE_EVENT_NOTIFICATION, (data) => {
      infoNotification(data.content);
      setNotifications((prevNotifications) => [
        { content: data.content, event: { id: data.event_id } },
        ...prevNotifications,
      ]);
    });

    const fetchNotifications = async () => {
      try {
        const response = await apiClient.get(
          Url.GET_MY_NOTIFICATIONS.replace(":id", user.uid)
        );
        setNotifications(response.data.data);

        console.log(response.data.data);
      } catch (error) {
        errorNotification("Error fetching notifications");
      }
    };

    fetchNotifications();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(SOCKET_CREATE_EVENT_NOTIFICATION);
    };
  }, []);
  return (
    <Layout>
      <Sidebar />

      <Layout>
        <Header notifications={notifications} />
        <Content style={{ padding: "20px" }}>
          <h1 style={{fontSize: "1.5rem", fontWeight: "bold"}}>{title}</h1>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateContainer;
