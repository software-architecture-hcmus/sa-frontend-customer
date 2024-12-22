import { signOut } from "firebase/auth";
import { authFirebase } from "../utils/firebase";
import RouterUrl from "../const/RouterUrl";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Badge, Dropdown } from "antd";
import { LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../const/LocalStorage";
import apiClient from "../utils/apiClient";
import Url from "../const/Url";
import { errorNotification } from "../utils/notification";

const { Header: AntdHeader } = Layout;

const Header = ({ notifications }) => {
  const navigate = useNavigate();  
  const user = useContext(UserContext);

  const logout = () => {
    signOut(authFirebase);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    navigate(RouterUrl.LOGIN);
  };

  const handleNotificationClick = (eventId) => {
    navigate(RouterUrl.EVENT_DETAIL.replace(":id", eventId));
  };

  const notificationMenu = {
    items: notifications.map((notification, index) => ({
      key: index,
      label: (
        <div style={{cursor: "pointer", padding: "10px"}} onClick={() => handleNotificationClick(notification.event.id)}>
          {notification.content}
        </div>
      ),
    })),
  };

  return (
    <AntdHeader style={{ backgroundColor: "white" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "16px"
      }}>
        <span style={{ whiteSpace: "nowrap" }}>
          <b>{user.email || "user"}</b>
        </span>
        
        <Dropdown menu={notificationMenu} placement="bottomRight">
          <Badge count={notifications.length} size="small">
            <BellOutlined style={{ fontSize: '18px' }} />
          </Badge>
        </Dropdown>

        <span onClick={logout} style={{ cursor: "pointer" }}>
          <LogoutOutlined />
        </span>
      </div>
    </AntdHeader>
  );
};

export default Header;
