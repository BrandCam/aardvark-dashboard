import React, { useState } from "react";
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
  let [imgUrls, setImgUrls] = useState([]);
  let [createReport, res] = useMutation(CREATE_REPORT);
  let { loading, error } = res;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        // const output = { ...values, imgUrls: imgUrls };
        //
        // setTimeout(() => {
        //   alert(JSON.stringify(output, null, 2));
        //   actions.setSubmitting(false);
        // }, 1000);
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
          alert("It Worked");
        } else {
          alert(error.message);
        }
      }}
    >
      {(props) => (
        <SimpleCard>
          <div className="header">
            <h1>Create Report</h1>
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
                tokenseperators={[,]}
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
