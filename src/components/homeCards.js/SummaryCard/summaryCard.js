import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../HOC/Context/LoginContext";
import { useQuery } from "@apollo/client";
import { GET_TESTER_SUMMARY } from "../../../Queys/fetch";
import ContentCard from "../../contentCard";
import Loader from "../../UI/loader";
import PlaceHolder from "../../UI/cardPlaceHolder";

const Wrap = styled.div`
  height: 400px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-between;
  color: #121212;

  h2 {
    padding: 0px 8px;
    background-color: rgba(24, 24, 24, 0.3);
    border-bottom: 5px solid #242424;
    border-right: 1px solid #242424;
    border-left: 2px solid #242424;
    display: inline;
    margin: 0px;
    color: white;
    opacity: 0.8;
  }
  p {
    font-family: digital-dream;
    display: inline;
    letter-spacing: 2px;
    padding: 10px 10px;
    background-color: #121212;
    border: 3px solid #242424;
    font-size: 3rem;
    margin: 0px;
    opacity: 0.8;
    transition: color 1s ease;
  }
  div {
  }
  &:hover p {
    color: #fa541c;
  }
`;

const SummaryCard = (props) => {
  let { state } = useContext(UserContext);
  let { data, loading, error } = useQuery(GET_TESTER_SUMMARY, {
    variables: {
      project_id: state.project,
    },
  });

  if (loading)
    return (
      <ContentCard animated>
        <PlaceHolder height="400px" width="300px">
          <Loader loading={true} size={100} color="#40A9FF" />
        </PlaceHolder>
      </ContentCard>
    );
  if (error)
    return (
      <ContentCard animated>
        <PlaceHolder height="400px" width="300px" color="white">
          <p>{error.message}</p>
        </PlaceHolder>
      </ContentCard>
    );
  if (data) {
    let { per, feedback, sent } = data.getTesterSummary;
    return (
      <ContentCard animated>
        <Wrap>
          <div>
            <h2>Tester links sent</h2>
          </div>

          <div>
            <p>{sent}</p>
          </div>
          <div>
            <h2>Feedback from testers</h2>
          </div>

          <div>
            <p>{feedback}</p>
          </div>
          <div>
            <h2>Feedback per tester</h2>
          </div>

          <div>
            <p>{per}</p>
          </div>
        </Wrap>
      </ContentCard>
    );
  }
};

export default SummaryCard;
