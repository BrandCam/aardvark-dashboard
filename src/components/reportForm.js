import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import { useMutation } from "@apollo/client";
import { CREATE_REPORT } from "../Queys/mutations";
import styled from "styled-components";
import { Button } from "antd";
import PicturesWall from "./imgUploader";
import { Formik, Form, Field } from "formik";
import {
  AntSelect,
  AntTextArea,
  AntInput,
} from "../HOC/CreateAntFields/CreateAntFields";
import { isRequired } from "../Helpers/FormValidation/FormValidation";
import SimpleCard from "../components/UI/simpleContentCard";
import errorCb from "../Helpers/errorPopup";

const initialValues = {};
const selectOptions = ["Bug", "Suggestion"];

const FormFields = styled.section`
  input,
  textarea,
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-dropdown {
    border: none;
    border-bottom: 1px solid #1f1f1f;
    background-color: #050b10;
    color: white;
  }
  .ant-select-selection-placeholder {
    color: #525558;
  }
  .ant-upload {
    background-color: #050b10;
    color: white;
  }
`;

const ReportForm = (props) => {
  let [decodedToken, setDecodedtoken] = useState(false);
  let [imgUrls, setImgUrls] = useState([]);
  const [fileList, setFileList] = useState([]);
  let [createReport, res] = useMutation(CREATE_REPORT);
  let { loading, error } = res;

  const normalSubmit = async (values, actions) => {
    const projectID = localStorage.getItem("project");
    await createReport({
      variables: {
        project_id: projectID,
        severity: "New",
        category: values.type,
        summary: values.description,
        description: values.details,
        video_url: values.videoUrl,
        img_urls: imgUrls,
      },
    });
    if (!error) {
      actions.resetForm();
      setImgUrls([]);
      setFileList([]);
    } else {
      alert(error.message);
    }
  };

  const guestSubmit = async (values, actions) => {
    await createReport({
      variables: {
        project_id: decodedToken.project_id,
        severity: "New",
        category: values.type,
        summary: values.description,
        description: values.details,
        video_url: values.videoUrl,
        img_urls: imgUrls,
        guest_creator: decodedToken.email,
      },
    });
    if (!error) {
      actions.resetForm();
      setImgUrls([]);
      setFileList([]);
    } else {
      alert(error.message);
    }
  };

  //set token from query param if guest
  useEffect(() => {
    if (props.query) {
      localStorage.setItem("guestToken", `Bearer ${props.query.get("token")}`);
      setDecodedtoken(decodeToken(props.query.get("token")));
    }
  }, [props.query]);

  useEffect(() => {
    if (error) {
      errorCb(error);
    }
  }, [error]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.isGuest ? guestSubmit : normalSubmit}
    >
      {(props) => (
        <SimpleCard>
          <div className="header">
            <h1>
              {decodedToken
                ? "Please submit as detailed a report as possible. Your feedback is appreciated."
                : "Create Report"}
            </h1>
          </div>
          <Form onSubmit={props.handleSubmit}>
            <FormFields className="content">
              <Field
                placeholder="Type Of Report"
                component={AntSelect}
                name="type"
                lable="report type"
                defaultValue={props.values.type}
                selectOptions={selectOptions}
                validate={isRequired}
                submitCount={props.submitCount}
                hasFeedback
              />
              <Field
                component={AntInput}
                name="description"
                type="text"
                label="description"
                placeholder="Short description"
                validate={isRequired}
                submitCount={props.submitCount}
                hasFeedback
              />
              <Field
                component={AntTextArea}
                name="details"
                type="text"
                placeholder="Full Discription"
                label="Details"
                rows={10}
                validate={isRequired}
                submitCount={props.submitCount}
                hasFeedback
              />

              <PicturesWall
                fileList={fileList}
                setFileList={setFileList}
                name="photos"
                imgUrls={imgUrls}
                setImgUrls={setImgUrls}
              />

              <Field
                component={AntInput}
                name="videoUrl"
                type="videoUrl"
                label="videoUrl"
                placeholder="Link to a Video Url"
                submitCount={props.submitCount}
              />
            </FormFields>
            <div className="footer">
              <Button type="primary" loading={loading} htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </SimpleCard>
      )}
    </Formik>
  );
};

export default ReportForm;
