import React from "react";
import BackDrop from "../components/UI/backDrop";
import CreateAccountForm from "../components/createAccountForm";

const CreateAccount = (props) => {
  return (
    <BackDrop>
      <CreateAccountForm />
    </BackDrop>
  );
};

export default CreateAccount;
