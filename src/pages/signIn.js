import React from "react";
import LoginForm from "../components/logForm";
import BackDrop from "../components/UI/backDrop";

const SignIn = (props) => {
  return (
    <BackDrop>
      <LoginForm />
    </BackDrop>
  );
};

export default SignIn;
