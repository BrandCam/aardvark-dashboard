import React from "react";
import PageWrap from "../components/UI/pageWrap";
import DashBoardCard from "../components/homeCards.js/DashBoardCard/dashboardCard";
import WorkingOnCard from "../components/homeCards.js/WorkingOnCard/workingOnCard";
import SummaryCard from "../components/homeCards.js/SummaryCard/summaryCard";
import { Helmet } from "react-helmet";
const Home = (props) => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Aardvark Dashboard" />
        <title>Aardvark | DashBoard</title>
      </Helmet>
      <PageWrap>
        <div
          style={{
            display: "flex",
            width: "95%",
            height: "100%",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <WorkingOnCard />
          <SummaryCard />
          <DashBoardCard />
        </div>
      </PageWrap>
    </>
  );
};

export default Home;
