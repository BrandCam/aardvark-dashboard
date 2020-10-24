import React from "react";
import PageWrap from "../components/UI/pageWrap";
import ContentCard from "../components/contentCard";
import UserSettingsCard from "../components/userSettingsCard";
import { Helmet } from "react-helmet";

const Settings = (props) => {
  return (
    <>
      <Helmet>
        <meta name="description" content="User settings" />
        <title>Aardvark | Settings</title>
      </Helmet>
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
    </>
  );
};

export default Settings;
