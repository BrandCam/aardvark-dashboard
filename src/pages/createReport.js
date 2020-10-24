import React from "react";
import ReportForm from "../components/reportForm";
import { Helmet } from "react-helmet";

const CreateReport = (props) => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Report Submision" />
        <title>Aardvark | Report Submit</title>
      </Helmet>
      <div style={{ marginTop: "40px" }}>
        <ReportForm />
      </div>
    </>
  );
};

export default CreateReport;
