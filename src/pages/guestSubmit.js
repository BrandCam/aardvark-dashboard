import React from "react";
import ReportForm from "../components/reportForm";
import useQuery from "../Helpers/hooks/useQuery";

const GuestSubmit = (props) => {
  let query = useQuery();

  return (
    <div style={{ marginTop: "40px" }}>
      <ReportForm query={query} isGuest />
    </div>
  );
};

export default GuestSubmit;
