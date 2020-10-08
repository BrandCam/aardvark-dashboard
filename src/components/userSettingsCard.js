import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../Queys/mutations";
import { UserContext, actionTypes } from "../HOC/Context/LoginContext";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { AntInput } from "../HOC/CreateAntFields/CreateAntFields";
import { isRequired } from "../Helpers/FormValidation/FormValidation";
const UserSettingsCard = (props) => {
  let [editUser, { loading, error }] = useMutation(EDIT_USER, {
    update: (proxy, { data }) => {
      const { updateUser } = data;
      const { token } = updateUser;
      localStorage.setItem("token", `Bearer ${token}`);
      dispatch({
        type: actionTypes.SET_TOKEN,
        payload: localStorage.getItem("token"),
      });
      dispatch({ type: actionTypes.SET_LOGIN, payload: true });
    },
  });

  let user = useContext(UserContext);
  let [isEdditing, setIsEdditing] = useState(false);
  let { state, dispatch } = user;
  let initialValues = {};
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        let { display_name } = values;
        console.log(display_name);
        await editUser({ variables: { display_name } });
        if (!error) {
          setIsEdditing(!isEdditing);
        }
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit} style={{ margin: "10px" }}>
          <h1 style={{ color: "white", marginTop: "5px" }}>Display Name</h1>
          {isEdditing ? (
            <Field
              component={AntInput}
              name="display_name"
              type="text"
              label="display_name"
              placeholder="New Display Name"
              validate={isRequired}
              submitCount={props.submitCount}
              hasFeedback
            ></Field>
          ) : (
            <h2 style={{ color: "white", margin: "10px" }}>
              {user.state.display_name}
            </h2>
          )}

          {isEdditing ? (
            <>
              <Button
                style={{ marginBottom: "10px" }}
                type="danger"
                onClick={() => setIsEdditing(!isEdditing)}
              >
                Cancel
              </Button>
              <Button
                loading={loading}
                style={{ marginBottom: "10px" }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </>
          ) : (
            <Button
              style={{ margin: "10px" }}
              type="primary"
              onClick={() => setIsEdditing(!isEdditing)}
            >
              Edit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default UserSettingsCard;
