import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ADMIN, ADD_GUEST } from "../Queys/mutations";
import SimpleCard from "../components/UI/simpleContentCard";
import { Formik, Form, Field } from "formik";
import { AntInput } from "../HOC/CreateAntFields/CreateAntFields";
import { isEmail } from "../Helpers/FormValidation/FormValidation";
import { Button } from "antd";
import errorCb from "../Helpers/errorPopup";

const Invite = (props) => {
  let { type } = props;
  let [addAdmin, { error: adminError, loading: adminLoading }] = useMutation(
    ADD_ADMIN
  );
  let [addGuest, { error: guestError, loading: guestLoading }] = useMutation(
    ADD_GUEST
  );

  const handleSubmitAdmin = async (values, actions) => {
    const projectID = localStorage.getItem("project");
    await addAdmin({
      variables: {
        admin_email: values.email,
        id: projectID,
      },
    });
    if (!adminError) {
      actions.resetForm();
    }
  };

  const handelSubmitGuest = async (values, actions) => {
    const projectID = localStorage.getItem("project");
    await addGuest({
      variables: {
        guest_email: values.email,
        id: projectID,
      },
    });
    if (!guestError) {
      actions.resetForm();
    }
  };

  useEffect(() => {
    if (guestError) {
      errorCb(guestError);
    }
    if (adminError) {
      errorCb(adminError);
    }
  }, [guestError, adminError]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SimpleCard
        style={{
          width: "100%",
        }}
      >
        <div className="header">
          <h1 style={{ paddingTop: "0px" }}>
            {props.type === "guest"
              ? " Email A Link To A User"
              : "Invite A Team Member"}{" "}
          </h1>
        </div>
        <Formik
          initialValues={{}}
          onSubmit={
            props.type === "guest" ? handelSubmitGuest : handleSubmitAdmin
          }
        >
          {(props) => (
            <>
              <Form onSubmit={props.handleSubmit}>
                <section className="content">
                  <Field
                    component={AntInput}
                    name="email"
                    type="email"
                    label="email"
                    placeholder="Please input a valid Email"
                    validate={isEmail}
                    submitCount={props.submitCount}
                    hasFeedback
                  />
                </section>
                <div className="footer" style={{ paddingBottom: "0px" }}>
                  <Button
                    loading={type === "guest" ? guestLoading : adminLoading}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </SimpleCard>
    </div>
  );
};

export default Invite;
