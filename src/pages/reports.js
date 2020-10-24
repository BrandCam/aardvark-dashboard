import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_REPORTS } from "../Queys/fetch";
import { UserContext } from "../HOC/Context/LoginContext";
import ReportsSection from "../components/Reports/reports";
import PageWrap from "../components/UI/pageWrap";
import { Helmet } from "react-helmet";

const Reports = ({ type }) => {
  let user = useContext(UserContext);
  let { project } = user.state;
  let [severityArgs, setSeverityArgs] = useState([]);
  let [resolvedArgs, setResolvedArgs] = useState(false);
  let [orderArgs, setOrderArgs] = useState(-1);
  let [limitArgs, setLimitArgs] = useState(8);
  let [pageArgs, setPageArgs] = useState(1);
  let [length, setLength] = useState(10);

  let { loading, error, data } = useQuery(GET_PROJECT_REPORTS, {
    variables: {
      id: project,
      category: type,
      severity: severityArgs,
      order: orderArgs,
      limit: limitArgs,
      page: pageArgs,
      is_resolved: resolvedArgs,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      if (data.getProject.reports.length !== length) {
        setLength(data.getProject.reports.length);
      }
    }
  }, [data, length]);

  if (error) {
    return <h1 style={{ color: "white" }}>{error.message}</h1>;
  }
  return (
    <>
      <Helmet>
        <meta name="description" content={`${type} Reports`} />
        <title>Aardvark | {type} Reports</title>
      </Helmet>
      <PageWrap style={{ flexWrap: "wrap-reverse" }}>
        <ReportsSection
          loadingReports={loading}
          setLimitArgs={setLimitArgs}
          setOrderArgs={setOrderArgs}
          setPageArgs={setPageArgs}
          setResolvedArgs={setResolvedArgs}
          setSeverityArgs={setSeverityArgs}
          resolvedArgs={resolvedArgs}
          severityArgs={severityArgs}
          orderArgs={orderArgs}
          limitArgs={limitArgs}
          pageArgs={pageArgs}
          reports={data ? data.getProject.reports.reports : null}
          length={length}
        />
      </PageWrap>
    </>
  );
};

export default Reports;
