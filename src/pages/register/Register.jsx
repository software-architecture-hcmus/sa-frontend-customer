import React from "react";
import RouterUrl from "../../const/RouterUrl";
import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { ROLE } from "../../const/Role";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { authFirebase, dbFirebase } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;


export default function Register() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const registerUser = async (values) => {
    const { email, password } = values;
    try {
        const userCredential = await createUserWithEmailAndPassword(authFirebase, email, password);
        console.log(userCredential);
        await setDoc(doc(dbFirebase, "users", userCredential.user.uid), {
            email: userCredential.user.email,
            role: ROLE.CUSTOMER,
        })

    } catch (error) {
        console.log(error);
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
      height: screens.sm ? "100vh" : "auto",
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

          <Title style={styles.title}>Sign up</Title>
          <Text style={styles.text}>
            Welcome to our platform! Please enter your details below to
            sign up.
          </Text>
        </div>
        <Form
          name="normal_register"
          initialValues={{
            remember: true,
          }}
          onFinish={registerUser}
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
            <Button block="true" type="primary" htmlType="submit">
              Sign up
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Already have an account?</Text>{" "}
              <Link href={RouterUrl.LOGIN}>Sign in now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}