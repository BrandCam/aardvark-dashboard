import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../HOC/Context/LoginContext";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_FULL_REPORT } from "../../Queys/fetch";
import { PICK_UP_REPORT, DROP_REPORT } from "../../Queys/mutations";
import { Button, Pagination } from "antd";
import ReportModal from "../UI/reportModal";
import ReportCard from "./reportCard";
import FilterControls from "./filterControls";
import styled from "styled-components";
import ContentCard from "../contentCard";
import FullReport from "./fullReport";
import Loader from "../../components/UI/loader";
const ReportWrap = styled.div`
  width: 100%;
  margin: 10px;
  .ant-pagination {
    margin-top: 15px;
    .ant-pagination-item {
      background: none;
      border: none;

      a {
        color: white;
      }
    }
    .ant-pagination-item-active {
      a {
        color: #40a9ff;
      }
    }
    button {
      background: none;
      border: none;
      color: white;
    }
    .ant-pagination-disabled {
      opacity: 0;
    }
    .ant-pagination-disabled:hover {
      cursor: pointer;
    }
    .ant-pagination-total-text {
      color: white;
    }
  }
`;

const Reports = ({
  reports,
  length,
  setLimitArgs,
  setOrderArgs,
  setPageArgs,
  setResolvedArgs,
  setSeverityArgs,
  resolvedArgs,
  severityArgs,
  orderArgs,
  limitArgs,
  pageArgs,
  loadingReports,
}) => {
  let user = useContext(UserContext);
  let [visible, setVisible] = useState(false);
  let [showUpdate, setShowUpdate] = useState(false);
  let [selectedReport, setSelectedReport] = useState(null);
  let [showComments, setShowComments] = useState(false);
  let [getFullReport, { loading, data, error }] = useLazyQuery(GET_FULL_REPORT);
  let [pickUp, { loading: isPickingUP }] = useMutation(PICK_UP_REPORT);
  let [drop, { loading: isDropping }] = useMutation(DROP_REPORT);
  let { state } = user;

  let handleShowUpdate = (e) => {
    setShowUpdate(!showUpdate);
  };

  let handleCancel = (e) => {
    setVisible(!visible);
    setShowComments(false);
  };
  let handelOpen = (report) => {
    setVisible(true);
    getFullReport({
      variables: { id: report.id, project_id: state.project },
      fetchPolicy: "cache-and-network",
    });
  };

  useEffect(() => {
    if (!loading && data && data.getReport) {
      setSelectedReport(data.getReport);
    }
  }, [data, loading]);

  return (
    <>
      <ContentCard
        active
        width="70%"
        style={{ marginRight: "0px", marginLeft: "0px" }}
      >
        <ReportWrap>
          {!loadingReports ? (
            <>
              {reports.length ? (
                reports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    toggelModal={handelOpen}
                  />
                ))
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "650px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1 style={{ color: "white" }}>
                    These arn't the reports you're looking for
                  </h1>
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                width: "100%",
                height: "650px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader size={200} color="#40A9FF" />
            </div>
          )}
          <Pagination
            onChange={(page, pageSize) => setPageArgs(page)}
            showTotal={(total) => `Total ${total} items`}
            hideOnSinglePage
            defaultCurrent={pageArgs}
            total={length}
          />
        </ReportWrap>
      </ContentCard>
      <FilterControls
        setLimitArgs={setLimitArgs}
        setOrderArgs={setOrderArgs}
        setPageArgs={setPageArgs}
        setResolvedArgs={setResolvedArgs}
        setSeverityArgs={setSeverityArgs}
        resolvedArgs={resolvedArgs}
        severityArgs={severityArgs}
        orderArgs={orderArgs}
        limitArgs={limitArgs}
        pageArgs={pageArgs}
      />

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
            {selectedReport && selectedReport.worked_by ? (
              selectedReport.worked_by.filter((obj) => obj.id === state.id)
                .length ? (
                <Button
                  key="drop"
                  type="danger"
                  ghost
                  loading={isDropping}
                  onClick={() => {
                    drop({
                      variables: {
                        project_id: state.project,
                        id: selectedReport.id,
                      },
                    });
                  }}
                >
                  Drop
                </Button>
              ) : (
                <Button
                  key="pick-up"
                  type="primary"
                  ghost
                  loading={isPickingUP}
                  onClick={() => {
                    pickUp({
                      variables: {
                        project_id: state.project,
                        id: selectedReport.id,
                      },
                    });
                  }}
                >
                  Pick Up
                </Button>
              )
            ) : null}
          </>
        }
        onOk={handleShowUpdate}
        onCancel={handleCancel}
      >
        <FullReport
          showComments={showComments}
          setShowComments={setShowComments}
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
