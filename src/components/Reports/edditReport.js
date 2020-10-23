import React, { useState, useEffect } from "react";
import PicturesWall from "../imgUploader";
import { Button, Col, Row } from "antd";
import { Formik, Form, Field } from "formik";
import {
  AntTextArea,
  AntInput,
  AntSelect,
} from "../../HOC/CreateAntFields/CreateAntFields";
import FormDrawer from "./edditReport.styles";
import { isRequired } from "../../Helpers/FormValidation/FormValidation";
import { useMutation } from "@apollo/client";
import { EDIT_REPORT } from "../../Queys/mutations";
import errorCb from "../../Helpers/errorPopup";

const selectOptions = ["Bug", "Suggestion"];
const severityOptions = ["New", "Minor", "Major", "Breaking"];
const resolvedOptions = ["false", "true"];

const EdditDrawer = ({ report, visable, setVisable }) => {
  let [updateReport, res] = useMutation(EDIT_REPORT);
  let [newImgs, setNewImgs] = useState([]);
  let [fileList, setFileList] = useState([]);
  let { error } = res;
  let {
    category,
    description,
    id,
    is_resolved,
    severity,
    summary,
    video_url,
    img_urls,
  } = report;

  const initialValues = {
    category,
    description,
    id,
    is_resolved: is_resolved ? "true" : "false",
    severity,
    summary,
    video_url,
    img_urls: [...img_urls],
  };

  useEffect(() => {
    if (error) {
      errorCb(error);
    }
  }, [error]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const project_id = localStorage.getItem("project");
          const output = {
            ...values,
            is_resolved: values.is_resolved === "true",
            img_urls: [...newImgs],
            project_id,
          };

          await updateReport({
            variables: {
              ...output,
            },
          });
          if (!res.error) {
            setFileList([]);
            setVisable();
          } else {
            console.log(res.error.message);
          }
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <FormDrawer
              title="Update Report"
              width={720}
              onClose={setVisable}
              visible={visable}
              bodyStyle={{ paddingBottom: 80 }}
              footer={
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Button
                    type="danger"
                    onClick={setVisable}
                    style={{ marginRight: 8 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={props.handleSubmit}
                    htmlType="submit"
                    type="primary"
                  >
                    Submit
                  </Button>
                </div>
              }
            >
              <Row gutter={16}>
                <Col span={12}>
                  <span>Type</span>
                  <Field
                    placeholder="Type Of Report"
                    component={AntSelect}
                    name="category"
                    lable="report type"
                    selectOptions={selectOptions}
                    validate={isRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                  />
                </Col>
                <Col span={12}>
                  <span>Severity</span>
                  <Field
                    placeholder="Severity of Problem"
                    component={AntSelect}
                    name="severity"
                    lable="report severity"
                    selectOptions={severityOptions}
                    validate={isRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <span>Summary</span>
                  <Field
                    type="text"
                    placeholder="Short Summary"
                    component={AntInput}
                    name="summary"
                    lable="report summary"
                    validate={isRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <span>Description</span>
                  <Field
                    type="text"
                    placeholder="Detailed Description"
                    component={AntTextArea}
                    name="description"
                    lable="report type"
                    rows={8}
                    validate={isRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                  />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <span>Video</span>
                  <Field
                    placeholder="Video Url"
                    component={AntInput}
                    type="text"
                    name="video_url"
                    lable="Video Url"
                    submitCount={props.submitCount}
                    hasFeedback
                  />
                  <span>Is Resolved</span>
                  <Field
                    placeholder="Is Resolved"
                    component={AntSelect}
                    name="is_resolved"
                    lable="report type"
                    selectOptions={resolvedOptions}
                    validate={isRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                  />
                </Col>
                <Col span={12}>
                  <PicturesWall
                    fileList={fileList}
                    setFileList={setFileList}
                    imgUrls={newImgs}
                    setImgUrls={setNewImgs}
                  />
                </Col>
              </Row>
            </FormDrawer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EdditDrawer;
