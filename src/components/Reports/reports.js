import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../HOC/Context/LoginContext";
import { useLazyQuery } from "@apollo/client";
import { GET_FULL_REPORT } from "../../Queys/fetch";
import { Modal, Button } from "antd";
import ReportModal from "../UI/reportModal";
import ReportCard from "./reportCard";
import FilterControls from "./filterControls";
import styled from "styled-components";
import ContentCard from "../contentCard";
import FullReport from "./fullReport";
const ReportWrap = styled.div`
  width: 100%;
  margin: 10px;
`;

const Reports = ({ reports }) => {
  let user = useContext(UserContext);
  let [visible, setVisible] = useState(false);
  let [showUpdate, setShowUpdate] = useState(false);
  let [selectedReport, setSelectedReport] = useState(null);
  let [getFullReport, { loading, data, error }] = useLazyQuery(GET_FULL_REPORT);
  let { state } = user;

  let handleShowUpdate = (e) => {
    setShowUpdate(!showUpdate);
  };

  let handleCancel = (e) => {
    setVisible(!visible);
  };
  let handelOpen = (report) => {
    setVisible(true);
    getFullReport({
      variables: { id: report.id, project_id: state.project },
    });
  };

  useEffect(() => {
    if (!loading && data && data.getReport) {
      setSelectedReport(data.getReport);
    }
  }, [data, loading]);

  return (
    <>
      <ContentCard width="80%">
        <ReportWrap>
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              toggelModal={handelOpen}
            />
          ))}
        </ReportWrap>
      </ContentCard>
      <FilterControls />

      <ReportModal
        className="full-report-modal"
        width="90%"
        report={selectedReport}
        title="Report Details"
        visible={visible}
        footer={
          <>
            <Button
              key="update"
              type="primary"
              loading={loading}
              onClick={handleShowUpdate}
            >
              Update
            </Button>
            <Button key="pick-up" type="primary" loading={loading} disabled>
              Pick Up
            </Button>
          </>
        }
        onOk={handleShowUpdate}
        onCancel={handleCancel}
      >
        <FullReport
          toggelUpdate={handleShowUpdate}
          updateVisible={showUpdate}
          report={selectedReport}
          loading={loading}
          error={error}
        />
      </ReportModal>
    </>
  );
};

export default Reports;
