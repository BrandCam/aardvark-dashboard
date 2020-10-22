import React from "react";
import PageWrap from "../components/UI/pageWrap";
import ContentCard from "../components/contentCard";
import UserSettingsCard from "../components/userSettingsCard";

const Settings = (props) => {
  return (
    <PageWrap>
      <ContentCard>
        <div
          style={{
            width: "300px",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0a141e",
          }}
        >
          <UserSettingsCard />
        </div>
      </ContentCard>
    </PageWrap>
  );
};

export default Settings;
