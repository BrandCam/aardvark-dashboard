import React from "react";
import ContentCard from "../components/contentCard";
import PageWrap from "../components/UI/pageWrap";

const Home = (props) => {
  return (
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
        <ContentCard animated>
          <div style={{ width: "600px", height: "400px" }}></div>
        </ContentCard>
        <ContentCard animated>
          <div style={{ width: "300px", height: "400px" }}></div>
        </ContentCard>
        <ContentCard animated>
          <div style={{ width: "800px", height: "400px" }}></div>
        </ContentCard>
      </div>
    </PageWrap>
  );
};

export default Home;
