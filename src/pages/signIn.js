import React from "react";
import LoginForm from "../components/logForm";
import BackDrop from "../components/UI/backDrop";
import { Helmet } from "react-helmet";

const SignIn = (props) => {
  return (
    <>
      <Helmet>
        <meta name="description" content="User sign in" />
        <title>Aardvark | Sign-In</title>
      </Helmet>
      <BackDrop>
        <LoginForm />
      </BackDrop>
    </>
  );
};

export default SignIn;
