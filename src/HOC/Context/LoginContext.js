import React, { createContext, useReducer, useEffect } from "react";
import { decodeToken } from "react-jwt";

const UserContext = createContext();
const token = localStorage.getItem("token");
const project = localStorage.getItem("project");

const initialState = {
  loggedIn: token ? true : false,
  token: token ? token : null,
  project: project ? project : null,
  id: null,
  email: null,
  display_name: null,
};
const actionTypes = {
  SET_LOGIN: "SET_LOGIN",
  SET_PROJECT: "SET_PROJECT",
  SET_USER: "SET_USER",
  SET_TOKEN: "SET_TOKEN",
  LOG_OUT: "LOG_OUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_LOGIN":
      return { ...state, loggedIn: action.payload };
    case "SET_PROJECT": {
      localStorage.setItem("project", action.payload);
      return { ...state, project: action.payload };
    }
    case "SET_USER":
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        display_name: action.payload.display_name,
      };
    case "LOG_OUT": {
      localStorage.clear();
      return {
        loggedIn: false,
        token: null,
        project: null,
        id: null,
        email: null,
        display_name: null,
      };
    }

    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  // let { decodedToken, isExpired } = useJwt(token);
  let [state, dispatch] = useReducer(reducer, initialState);
  const user = { state, dispatch };

  useEffect(() => {
    const decodedToken = decodeToken(state.token);
    if (decodedToken !== null) {
      let { id, email, display_name } = decodedToken;
      dispatch({
        type: actionTypes.SET_USER,
        payload: { id, email, display_name },
      });
    }
  }, [state.loggedIn, state.token]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const UserContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, UserContextConsumer, actionTypes };
