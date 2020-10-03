import React, { useContext } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Queys/mutations";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { assertNamedType } from "graphql";
import { UserContext, actionTypes } from "../HOC/Context/LoginContext";

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
  #normal_login_display_name {
    background-color: rgba(255, 255, 255, 0);
    color: white;
  }
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

const CreateAccountForm = () => {
  let user = useContext(UserContext);
  let history = useHistory();
  let [createUser, res] = useMutation(CREATE_USER, {
    update: (proxy, { data }) => {
      const { createUser } = data;
      const { token } = createUser;
      localStorage.setItem("token", `Bearer ${token}`);
      dispatch({
        type: actionTypes.SET_TOKEN,
        payload: localStorage.getItem("token"),
      });
      dispatch({ type: actionTypes.SET_LOGIN, payload: true });
    },
  });
  let { loading, error } = res;
  let { dispatch } = user;
  const onFinish = async ({ email, password, display_name }) => {
    await createUser({ variables: { email, password, display_name } });
    if (!error) {
      history.push("/");
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <LogForm
      name="normal_login"
      className="login-form"
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item
        name="display_name"
        rules={[
          {
            required: true,
            message: "Please input a Display Name!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="Display Name"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            border: "none",
          }}
        />
      </Form.Item>
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

      <Form.Item style={{ color: "white" }}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ width: "100%" }}
        >
          Create
        </Button>
        Or <Link to="/">Log In</Link>
      </Form.Item>
    </LogForm>
  );
};

export default CreateAccountForm;
