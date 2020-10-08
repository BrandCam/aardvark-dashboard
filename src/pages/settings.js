import React from "react";
import PageWrap from "../components/UI/pageWrap";
import ContentCard from "../components/contentCard";
import UserSettingsCard from "../components/userSettingsCard";

const Settings = (props) => {
  return (
    <PageWrap>
      <ContentCard>
        <UserSettingsCard />
      </ContentCard>
    </PageWrap>
  );
};

export default Settings;
