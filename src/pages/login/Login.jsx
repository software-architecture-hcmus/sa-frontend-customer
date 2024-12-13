import { useState, useEffect } from "react";
import RouterUrl from "../../const/RouterUrl";
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { errorNotification, successNotification } from "../../utils/notification";

import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "../../utils/firebase";


const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {

  const [loading, setLoading] = useState(false);
  const { token } = useToken();
  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state &&  location.state.message) {

      if (location.state.success) {
        successNotification(location.state.message);
      }
      else{
        errorNotification(location.state.message);
      }
    }
  }, [location.state]);

  const login = async (values) => {
    try {
      setLoading(true);
      const { email, password } = values;
      await signInWithEmailAndPassword(authFirebase, email, password);
      localStorage.removeItem("register"); // remove flag
      navigate(RouterUrl.HOME);

    } catch (error) {
      errorNotification(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>

          <Title style={styles.title}>[CUSTOMER] Sign in</Title>
          <Text style={styles.text}>
            Welcome back! Please enter your details below to
            sign in.
          </Text>
        </div>
        <Form
          disabled={loading}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={login}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Link href={RouterUrl.REGISTER}>Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}