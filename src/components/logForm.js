import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { useLazyQuery } from "@apollo/client";
import { LOG_IN } from "../Queys/fetch";
import { UserContext, actionTypes } from "../HOC/Context/LoginContext";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LogForm = styled(Form)`
  width: 400px;
  background-color: #001529;
  border-radius: 10px;
  padding: 5px;
  #normal_login_password {
    background-color: rgba(255, 255, 255, 0);
    color: white;
  }
  #normal_login_email {
    background-color: rgba(255, 255, 255, 0);
    color: white;
  }
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

const LoginForm = () => {
  let user = useContext(UserContext);
  const [logIn, { called, loading, data }] = useLazyQuery(LOG_IN);
  let { dispatch } = user;
  const onFinish = ({ email, password }) => {
    logIn({ variables: { password, email } });
  };

  useEffect(() => {
    if (called && !loading && data) {
      let token = data.logInUser.token;
      localStorage.setItem("token", `Bearer ${token}`);
      dispatch({
        type: actionTypes.SET_TOKEN,
        payload: localStorage.getItem("token"),
      });
      dispatch({ type: actionTypes.SET_LOGIN, payload: true });
    }
  }, [called, loading, data, dispatch]);

  return (
    <LogForm
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="Email"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "none",
          }}
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
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "none",
          }}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox style={{ float: "left", color: "white" }}>
            Remember me
          </Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" style={{ float: "right" }} href="">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item style={{ color: "white" }}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%" }}
        >
          Log in
        </Button>
        Or <Link to="/new-user">register now!</Link>
      </Form.Item>
    </LogForm>
  );
};

export default LoginForm;
