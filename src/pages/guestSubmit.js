import React, { useEffect, useContext } from "react";
import ReportForm from "../components/reportForm";
import useQuery from "../Helpers/hooks/useQuery";
import { UserContext, actionTypes } from "../HOC/Context/LoginContext";
import { Helmet } from "react-helmet";

const GuestSubmit = (props) => {
  let { state, dispatch } = useContext(UserContext);
  let query = useQuery();
  useEffect(() => {
    if (state.loggedIn) {
      dispatch({ type: actionTypes.LOG_OUT });
    }
  }, [state.loggedIn, dispatch]);

  return (
    <>
      <Helmet>
        <meta name="description" content="Guest report submission" />
        <title>Aardvark | Guest Report Submit</title>
      </Helmet>
      <div style={{ marginTop: "40px" }}>
        <ReportForm query={query} isGuest />
      </div>
    </>
  );
};

export default GuestSubmit;
