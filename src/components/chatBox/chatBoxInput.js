import styled from "styled-components";
import React, { useContext } from "react";
import { UserContext } from "../../HOC/Context/LoginContext";
import { Spin } from "antd";
import { Formik, Form, Field } from "formik";
import { AntTextArea } from "../../HOC/CreateAntFields/CreateAntFields";
import { SendOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../Queys/mutations";

const ChatForm = styled(Form)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .ant-form-item {
    margin-bottom: 0;
  }
  textarea {
    resize: none;
    background-color: #0a141e;
    border: 1px solid #0a141e;
    border-radius: 10px;
    color: white;
    flex-grow: 2;
  }
  .field-container {
    flex-grow: ${(props) => (props.hasValue ? "2" : "")};
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease-in;
  }
  .field-container:focus-within {
    flex-grow: 2;
  }
  button {
    all: unset;
  }

  span {
    cursor: pointer;
    color: #1690f5;
    font-size: 1.7rem;
    margin-left: 10px;
  }
  .ant-spin {
    margin-bottom: -2px;
  }
`;

const ChatBoxInput = ({ report_id }) => {
  let { state } = useContext(UserContext);
  let { project } = state;
  let [createComment, res] = useMutation(CREATE_COMMENT);
  let { loading, error } = res;
  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values, actions) => {
        if (values.comment) {
          await createComment({
            variables: {
              project_id: project,
              report_id,
              content: values.comment,
            },
          });
          if (!error) {
            actions.resetForm();
          } else {
            alert(error.message);
          }
        }
      }}
    >
      {(props) => (
        <ChatForm hasValue={props.values.comment} onSubmit={props.handleSubmit}>
          <Field
            type="text"
            placeholder="Aa"
            component={AntTextArea}
            name="comment"
            lable="comment"
            rows={1}
            submitCount={props.submitCount}
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
          {!loading ? (
            <button type="submit">
              <SendOutlined />
            </button>
          ) : (
            <Spin />
          )}
        </ChatForm>
      )}
    </Formik>
  );
};

export default ChatBoxInput;
