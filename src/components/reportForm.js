import React, { useState } from "react";
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
const initialValues = {};
const selectOptions = ["Bug", "Suggestion"];

const TopFields = styled.div``;
const BottomFields = styled.div``;

const ReportForm = (props) => {
  const [imgUrls, setImgUrls] = useState([]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const output = { ...values, imgUrls: imgUrls };
        setTimeout(() => {
          alert(JSON.stringify(output, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <Field
            placeholder="Type Of Report"
            component={AntSelect}
            name="type"
            lable="report type"
            defaultValue={props.values.type}
            selectOptions={selectOptions}
            validate={isRequired}
            submitCount={props.submitCount}
            tokenSeperators={[,]}
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ReportForm;
