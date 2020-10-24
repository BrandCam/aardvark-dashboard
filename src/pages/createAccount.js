import React from "react";
import BackDrop from "../components/UI/backDrop";
import CreateAccountForm from "../components/createAccountForm";
import { Helmet } from "react-helmet";

const CreateAccount = (props) => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Account creation" />
        <title>Aardvark | Account Creation</title>
      </Helmet>
      <BackDrop>
        <CreateAccountForm />
      </BackDrop>
    </>
  );
};

export default CreateAccount;
