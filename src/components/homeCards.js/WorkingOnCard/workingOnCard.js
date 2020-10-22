import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../HOC/Context/LoginContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_REPORTS } from "../../../Queys/fetch";
import { DROP_REPORT } from "../../../Queys/mutations";
import { Tabs, Button, Tooltip } from "antd";
import ContentCard from "../../contentCard";
import PreviewWrap from "./reportPreview.style";
import FullReport from "../../Reports/fullReport";
import EdditDrawer from "../../Reports/edditReport";
import PlaceHolder from "../../UI/cardPlaceHolder";
import Loader from "../../UI/loader";
import IdShorten from "../../../Helpers/shortenId";

const { TabPane } = Tabs;

const MyTabs = styled(Tabs)`
  /* TABS */
  .ant-tabs-nav {
    background-color: #121212;
  }
  .ant-tabs-tab {
    color: white;
  }
  .ant-tabs-nav-more {
    color: #1690f5;
  }

  /* CONTENT */
  .ant-tabs-content-holder {
    overflow-y: scroll;
  }
  .ant-tabs-content-holder::-webkit-scrollbar-track {
    background: linear-gradient(to top, #001427, #002140);
  }

  .ant-tabs-content-holder::-webkit-scrollbar {
    width: 10px;
  }

  .ant-tabs-content-holder::-webkit-scrollbar-thumb {
    background-color: #0ae;

    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    );
  }

  .footer {
    background-color: #141414;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #262626;
    button {
      margin: 10px;
    }
  }
`;

const WorkingOnCard = (props) => {
  let [showUpdate, setShowUpdate] = useState(false);
  let [showComments, setShowComments] = useState(false);
  let [reportToEddit, setReportToEddit] = useState(null);
  let [selected, setSelected] = useState("0");
  let user = useContext(UserContext);
  let { project } = user.state;

  let { loading, data, error } = useQuery(GET_MY_REPORTS, {
    variables: { project_id: project },
    fetchPolicy: "cache-and-network",
  });
  let [drop, { loading: isDropping }] = useMutation(DROP_REPORT);

  if (loading)
    return (
      <ContentCard width="100%" active animated>
        <PlaceHolder background="#121212" width="100%" height="600px">
          <Loader size={100} loading={loading} color="#39FF14" />
        </PlaceHolder>
      </ContentCard>
    );
  if (error)
    return (
      <ContentCard width="100%" active animated>
        <PlaceHolder
          background="#121212"
          width="100%"
          height="600px"
          color="white"
        >
          <p>{error.message}</p>
        </PlaceHolder>
      </ContentCard>
    );
  if (data && data.getMyReports)
    return (
      <ContentCard active width="100%">
        <MyTabs
          onChange={(activeKey) => {
            setSelected(activeKey);
          }}
          defaultActiveKey={selected}
          tabPosition="left"
          style={{ height: 600, width: "100%" }}
        >
          {data.getMyReports.length ? (
            data.getMyReports.map((report, i) => (
              <TabPane
                tab={
                  <Tooltip title={report.id} color="volcano">{`${IdShorten(
                    report.id
                  )}`}</Tooltip>
                }
                key={i}
              >
                <PreviewWrap>
                  <FullReport
                    showComments={selected == i && showComments}
                    setShowComments={setShowComments}
                    loading={loading}
                    error={error}
                    report={report}
                  />
                  <div className="footer">
                    <Button
                      key="update"
                      type="primary"
                      loading={loading}
                      onClick={() => {
                        setReportToEddit(report);
                        setShowUpdate(!showUpdate);
                      }}
                    >
                      Update
                    </Button>

                    <Button
                      key="drop"
                      type="danger"
                      ghost
                      loading={isDropping}
                      onClick={() => {
                        drop({
                          variables: {
                            project_id: project,
                            id: report.id,
                          },
                        });
                      }}
                    >
                      Drop
                    </Button>
                  </div>
                </PreviewWrap>
              </TabPane>
            ))
          ) : (
            <TabPane>
              <div
                style={{
                  width: "100%",
                  height: "600px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 style={{ color: "white" }}>
                  You are not currently assigned any Reports
                </h1>
              </div>
            </TabPane>
          )}
        </MyTabs>
        {reportToEddit ? (
          <EdditDrawer
            report={reportToEddit}
            visable={showUpdate}
            setVisable={() => {
              setShowUpdate(false);
            }}
          />
        ) : null}
      </ContentCard>
    );
};

export default WorkingOnCard;
