import {
  AppstoreOutlined,
  UserOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import RouterUrl from "../const/RouterUrl";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
const { Sider } = Layout;

const SidebarMenu = [
  {
    label: <Link to={RouterUrl.HOME}>Dashboard</Link>,
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link to={RouterUrl.SUBCRIBED_EVENTS}>Subscribed Events</Link>,
    icon: <CalendarOutlined />,
  },
  {
    label: <Link to={RouterUrl.MY_VOUCHERS}>My Vouchers</Link>,
    icon: <CreditCardOutlined />,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
      }}
      collapsedWidth={40}
    >
      <div
        style={{
          textAlign: "center",
          padding: "16px",
        }}
      >
        {collapsed ? <h3>LOGO</h3> : <h1>LOGO</h1>}
      </div>
      <Menu mode="inline" items={SidebarMenu} />
    </Sider>
  );
};

export default Sidebar;
