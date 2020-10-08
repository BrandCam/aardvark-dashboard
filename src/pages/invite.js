import React from "react";
import SimpleCard from "../components/UI/simpleContentCard";
import { Formik, Form, Field } from "formik";
import { AntInput } from "../HOC/CreateAntFields/CreateAntFields";
import { isEmail, isRequired } from "../Helpers/FormValidation/FormValidation";
import { Button } from "antd";
const Invite = (props) => {
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
            Invite{props.type === "guest" ? " A Guest" : " Team Member"}{" "}
          </h1>
        </div>
        <Formik
          initialValues={{}}
          onSubmit={async (values, actions) => {
            alert(values.email);
          }}
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
                  <Button type="primary" htmlType="submit">
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
