import React from "react";
import ReportWrap from "./reportCard.style";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { COLOR_TABLE } from "../../colors";
const ReportCard = ({ toggelModal, report }) => {
  return (
    <ReportWrap>
      <div
        className="type"
        style={{
          backgroundColor: `${
            report.category === "Suggestion"
              ? "rgba(57,255,20, 0.3)"
              : "rgba(255, 7, 58, 0.3)"
          }`,
          borderRight: `1px solid ${
            report.category === "Suggestion"
              ? "rgba(57,255,20, 0.5)"
              : "rgba(255, 7, 58, 0.5)"
          }`,
          color: `${
            report.category === "Suggestion"
              ? "rgb(57,255,20)"
              : "rgb(255, 7, 58)"
          }`,
        }}
      >
        {report.category}
      </div>
      <div className="description">
        <div
          className="severity"
          style={{
            backgroundColor: `rgba${COLOR_TABLE[report.severity]}, 0.3)`,
            border: `1px solid rgba${COLOR_TABLE[report.severity]}, 0.5)`,
            color: `rgb${COLOR_TABLE[report.severity]})`,
          }}
        >
          {report.severity}
        </div>
        <p>{report.summary}</p>
      </div>
      <Button
        onClick={() => toggelModal(report)}
        shape="circle"
        className="button"
      >
        <PlusOutlined />
      </Button>
    </ReportWrap>
  );
};

export default ReportCard;
