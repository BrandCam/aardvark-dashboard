import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_REPORTS } from "../Queys/fetch";
import { UserContext, actionTypes } from "../HOC/Context/LoginContext";
import ReportsSection from "../components/Reports/reports";
import PageWrap from "../components/UI/pageWrap";

const Reports = ({ type }) => {
  let user = useContext(UserContext);
  let { project } = user.state;

  let { loading, error, data } = useQuery(GET_PROJECT_REPORTS, {
    variables: { id: project },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <PageWrap>
      <ReportsSection
        reports={data.getProject.reports.filter(
          (report) => report.category === type
        )}
      />
    </PageWrap>
  );
};

export default Reports;
