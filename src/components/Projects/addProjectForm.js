import React, { useContext, useEffect } from "react";
import { UserContext, actionTypes } from "../../HOC/Context/LoginContext";
import styled from "styled-components";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import { GET_USERS_PROJECTS } from "../../Queys/fetch";
import { CREATE_PROJECT } from "../../Queys/mutations";
import { AntInput } from "../../HOC/CreateAntFields/CreateAntFields";
import { isRequired } from "../../Helpers/FormValidation/FormValidation";
import errorCb from "../../Helpers/errorPopup";

const MyForm = styled(Form)`
  h2 {
    color: #39ff14;
    text-align: left;
    font-size: 2rem;
  }
  .field-container {
    margin-bottom: 100px;
  }
  input {
    border: none;
    border-bottom: 1px solid #1f1f1f;
    background-color: #050b10;
    color: white;
  }
`;
const MyButton = styled.button`
  all: unset;
  font-size: 3rem;
  color: #39ff14;
  cursor: pointer;
  .add {
    margin-left: 40px;
  }
  .cancel {
    color: #dc454a;
    margin-right: 40px;
  }
`;

const AddProjectForm = ({ cancel, isEdditing }) => {
  const { state, dispatch } = useContext(UserContext);
  let [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    onCompleted: (data) => {
      dispatch({
        type: actionTypes.SET_PROJECT,
        payload: data.createProject.id,
      });
    },
    refetchQueries: [
      {
        query: GET_USERS_PROJECTS,
        variables: { email: state.email },
      },
    ],
  });

  useEffect(() => {
    if (error) {
      errorCb(error);
    }
  }, [error]);

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={async (values, actions) => {
          let { title } = values;
          await createProject({ variables: { title } });
          if (!error) {
            cancel();
          }
        }}
      >
        {(props) => (
          <MyForm onSubmit={props.handleSubmit}>
            <h2>Title</h2>
            <Field
              component={AntInput}
              name="title"
              type="text"
              label="title"
              placeholder="Title"
              validate={isRequired}
              submitCount={props.submitCount}
              hasFeedback
            />
            <MyButton onClick={cancel}>
              <CloseCircleOutlined className="cancel" />
            </MyButton>
            <MyButton type="submit">
              <PlusCircleOutlined className="add" spin={loading} />
            </MyButton>
          </MyForm>
        )}
      </Formik>
    </>
  );
};

export default AddProjectForm;
