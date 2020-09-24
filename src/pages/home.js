import React from "react";
import ContentCard from "../components/contentCard";

const Home = (props) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "100%",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <ContentCard>
          <div style={{ width: "600px", height: "400px" }}></div>
        </ContentCard>
        <ContentCard>
          <div style={{ width: "300px", height: "400px" }}></div>
        </ContentCard>
        <ContentCard>
          <div style={{ width: "800px", height: "400px" }}></div>
        </ContentCard>
      </div>
      <div
        style={{
          display: "flex",
          width: "20%",
          height: "100%",
          flexWrap: "wrap",
          justifyContent: "space-around",
          backgroundColor: "#eee",
          borderRadius: "10px",
        }}
      >
        text
      </div>
    </div>
  );
};

export default Home;
