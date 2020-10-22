import React, { useContext } from "react";
import { UserContext } from "../Context/LoginContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  let { state } = useContext(UserContext);
  let { loggedIn } = state;
  return <Route {...rest}>{loggedIn ? children : <Redirect to="/" />}</Route>;
};

export default PrivateRoute;
