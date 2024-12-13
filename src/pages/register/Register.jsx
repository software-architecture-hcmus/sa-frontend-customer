import { useState } from "react";
import RouterUrl from "../../const/RouterUrl";
import { Button, Form, Grid, Input, theme, Typography, Select } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { ROLE, STATUS, FIREBASE_USER_COLLECTION } from "../../const/User";
import {  errorNotification } from "../../utils/notification";
import { useLocation, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { authFirebase, dbFirebase } from "../../utils/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();

  const register = async (values) => {
    const { email, password } = values;
    try {
      setLoading(true);
      localStorage.setItem("register", "true"); // flag
      const userCredential = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      const userRef = collection(dbFirebase, FIREBASE_USER_COLLECTION);
      await setDoc(doc(userRef, userCredential.user.uid), {
        email: userCredential.user.email,
        role: ROLE.CUSTOMER,
        status: STATUS.ACTIVE,
      });
      signOut(authFirebase); // auth cua firebase tu dong login sau khi register -> minh ko muon z nen tu logout ra :))
      navigate(RouterUrl.LOGIN, {state: {from: location.pathname, message: "Register successfully, you can login now!", success: true}})

    } catch (error) {
      errorNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>[CUSTOMER] Sign up</Title>
          <Text style={styles.text}>
            Welcome to our platform! Please enter your details below to sign up.
          </Text>
        </div>
        <Form
          disabled={loading}
          name="normal_register"
          initialValues={{
            remember: true,
          }}
          onFinish={register}
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
            <Input prefix={<MailOutlined />} placeholder="Email" />
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

          {/* <Form.Item
            name="role"
            rules={[
              {
                required: true,
                message: "Please input your Account type!",
              },
            ]}
          >
            <Select
              prefix={<UserOutlined />}
              placeholder="Account type"
              options={Object.values(ROLE)
                .filter((role) => role !== ROLE.ADMIN)
                .map((role) => ({
                  label: role,
                  value: role,
                }))}
            />
          </Form.Item> */}

          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" loading={loading}>
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
