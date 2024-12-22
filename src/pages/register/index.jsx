import { useState } from "react";
import RouterUrl from "../../const/RouterUrl";
import { Button, Form, Grid, Input, theme, Typography, Select, DatePicker } from "antd";
import { LockOutlined, MailOutlined, UserOutlined, IdcardOutlined, CalendarOutlined } from "@ant-design/icons";
import { ROLE, STATUS, FIREBASE_USER_COLLECTION, GENDER } from "../../const/User";
import { errorNotification } from "../../utils/notification";
import { useLocation, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { authFirebase, dbFirebase } from "../../utils/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { REGISTER_FLAG } from "../../const/LocalStorage";

//TODO: add image and facebook account

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
      localStorage.setItem(REGISTER_FLAG, "true"); // flag
      const userCredential = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      const userRef = collection(dbFirebase, FIREBASE_USER_COLLECTION);
      const userData = {
        ...values,
        date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
      }
      delete userData.password;
      await setDoc(doc(userRef, userCredential.user.uid), {
        email: userCredential.user.email,
        role: ROLE.CUSTOMER,
        status: STATUS.ACTIVE,
        ...userData,
      });
      signOut(authFirebase); // auth cua firebase tu dong login sau khi register -> minh ko muon z nen tu logout ra :))
      navigate(RouterUrl.LOGIN, {
        state: {
          from: location.pathname,
          message: "Register successfully, you can login now!",
          success: true,
        },
      });
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
      borderRadius: token.borderRadiusSM,
      backgroundColor: "#f4f8fb",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "95vh"
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
      marginTop: token.marginXXS
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Text style={styles.text}>
            <b>[Customer portal]</b>
          </Text>
          <Title style={styles.title}>REGISTER</Title>
          <Text style={styles.text}>
            Welcome to customer portal! Enter your details to sign up.
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
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name ="date_of_birth"
            rules={[
              {
                required: true,
                message: "Please input your date of birth!",
              },
            ]}
          >
            <DatePicker prefix={<CalendarOutlined />} placeholder="Date of birth" />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input your gender!",
              },
            ]}
          >
            <Select prefix={<UserOutlined />} placeholder="Gender" options={Object.values(GENDER).map((gender) => ({
              label: gender,
              value: gender,
            }))} />
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
            <Button
              block="true"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
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
