import React from "react";
import LoginForm from "../components/logForm";
import styled from "styled-components";

const LogInBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: 0;
`;

const SignIn = (props) => {
  return (
    <LogInBg>
      <LoginForm />
    </LogInBg>
  );
};

export default SignIn;
