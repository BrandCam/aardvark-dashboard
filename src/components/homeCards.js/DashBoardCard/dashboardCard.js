import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../HOC/Context/LoginContext";
import { useQuery } from "@apollo/client";
import { GET_REPORT_SUMMARY } from "../../../Queys/fetch";
import styled from "styled-components";
import ContentCard from "../../contentCard";
import PlaceHolder from "../../UI/cardPlaceHolder";
import Loader from "../../UI/loader";
import { Progress, Tag, Switch } from "antd";
import { COLOR_TABLE } from "../../../colors";

const MyTag = styled(Tag)`
  background-color: ${({ background }) => `${background}`};
  cursor: pointer;
`;
const MyProgress = styled(Progress)`
  .ant-progress-text {
    font-family: digital-dream;
    opacity: 1;
    background-color: #121212;
    padding: 5px;
    border-left: 1px solid
      ${(props) => (props.color ? props.color.slice(0, -2) + "0.2)" : "white")};

    border-bottom: 1px solid
      ${(props) => (props.color ? props.color.slice(0, -2) + "0.3)" : "white")};

    color: ${(props) => (props.color ? props.color : "white")};
    width: auto;
  }
  .ant-progress-text:after {
    box-sizing: content-box;
    top: 0;
    left: -2px;
    border: 1px solid #121212;
    opacity: 1;
    transition: opacity 1s ease;
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #121212;
  }
`;
const Wrap = styled.div`
  .lable {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      padding: 0px 5px;
      background-color: rgba(24, 24, 24, 0.3);
      border-top: 2px solid #242424;
      border-bottom: 2px solid #242424;
      border-right: 10px solid rgba(32, 32, 32, 0.1);
      border-left: 10px solid rgba(32, 32, 32, 0.1);
      width: auto;
      display: inline;
      margin-top: 10px;
      margin-bottom: 10px;
      color: white;
    }
    
      .ant-switch-handle::before {
        border-left: 5px solid rgba(32, 32, 32, 0.2);
        border-bottom: 5px solid rgba(50, 50, 50, 0.2);
        border-radius: 50%;
      }
    }
    .ant-switch-checked {
      background-color: rgba(24, 144, 255, 0.5);
    }
  }

  .guage {
    display: flex;
    flex-direction: column;
    padding: 0px 10px 25px 0px;
  }
  .guage:nth-child(1) {
    padding-left: 20px;
  }
  .guage:last-child {
    padding-right: 20px;
  }

  &:hover ${MyProgress} .ant-progress-text::after {
    opacity: 0;
  }
`;

const DashBoardCard = (props) => {
  let { state } = useContext(UserContext);
  let { project } = state;
  let [type, setType] = useState("Bug");
  let [total, setTotal] = useState(0);
  let { data, loading, error } = useQuery(GET_REPORT_SUMMARY, {
    variables: { project_id: project, type },
  });

  useEffect(() => {
    if (data) {
      let newTotal = 0;
      let summary = data.getReportsSummary;
      newTotal += summary.New;
      newTotal += summary.Major;
      newTotal += summary.Minor;
      newTotal += summary.Breaking;
      setTotal(newTotal);
    }
  }, [data]);

  if (loading)
    return (
      <ContentCard animated>
        <PlaceHolder height="230px" width="550px">
          <Loader loading={true} size={100} color="#40A9FF" />
        </PlaceHolder>
      </ContentCard>
    );
  if (error)
    return (
      <ContentCard animated>
        <PlaceHolder height="230px" width="550px" color="white">
          <p>{error.message}</p>
        </PlaceHolder>
      </ContentCard>
    );
  if (data)
    return (
      <ContentCard animated>
        <Wrap>
          <div className="lable">
            <h1>{`${type}s`}</h1>
            <Switch
              loading={loading}
              checked={type === "Suggestion"}
              onChange={() => {
                setType(type === "Bug" ? "Suggestion" : "Bug");
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div className="guage">
              <MyProgress
                color={`rgba${COLOR_TABLE.New}, 1)`}
                trailColor="#white"
                strokeColor={`rgba${COLOR_TABLE.New}, 0.8)`}
                type="dashboard"
                format={(percent) => `${data.getReportsSummary.New} `}
                percent={(data.getReportsSummary.New / total) * 100}
              />
              <MyTag background={`rgba${COLOR_TABLE.New}, 0.2)`} color="green">
                New{" "}
              </MyTag>
            </div>
            <div className="guage">
              <MyProgress
                color={`rgba${COLOR_TABLE.Minor}, 1)`}
                trailColor="#262626"
                strokeColor={`rgba${COLOR_TABLE.Minor}, 0.8)`}
                type="dashboard"
                format={(percent) => `${data.getReportsSummary.Minor}`}
                percent={(data.getReportsSummary.Minor / total) * 100}
              />
              <MyTag background={`rgba${COLOR_TABLE.Minor}, 0.2)`} color="blue">
                Minor
              </MyTag>
            </div>
            <div className="guage">
              <MyProgress
                color={`rgba${COLOR_TABLE.Major}, 1)`}
                trailColor="white"
                strokeColor={`rgba${COLOR_TABLE.Major}, 0.8)`}
                type="dashboard"
                format={(percent) => `${data.getReportsSummary.Major} `}
                percent={(data.getReportsSummary.Major / total) * 100}
              />
              <MyTag
                background={`rgba${COLOR_TABLE.Major}, 0.2)`}
                color="orange"
              >
                Major
              </MyTag>
            </div>
            <div className="guage">
              <MyProgress
                color={`rgba${COLOR_TABLE.Breaking}, 1)`}
                trailColor="#262626"
                strokeColor={`rgba${COLOR_TABLE.Breaking}, 0.8)`}
                type="dashboard"
                format={(percent) => `${data.getReportsSummary.Breaking}`}
                percent={(data.getReportsSummary.Breaking / total) * 100}
              />
              <MyTag
                background={`rgba${COLOR_TABLE.Breaking}, 0.2)`}
                color="red"
              >
                {" "}
                Breaking
              </MyTag>
            </div>
          </div>
        </Wrap>
      </ContentCard>
    );
};

export default DashBoardCard;
