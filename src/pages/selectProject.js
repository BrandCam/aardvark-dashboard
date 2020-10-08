import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USERS_PROJECTS } from "../Queys/fetch";
import { UserContext, actionTypes } from "../HOC/Context/LoginContext";
import ProjectCard from "../components/projectCard";

const SelectProject = (props) => {
  let user = useContext(UserContext);
  let history = useHistory();
  let { state, dispatch } = user;
  let { loading, error, data } = useQuery(GET_USERS_PROJECTS, {
    variables: { email: state.email },
  });
  const handleSelect = (id) => {
    dispatch({ type: actionTypes.SET_PROJECT, payload: id });
    history.push("/");
  };
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data.getUser.projects.map((project) => (
        <ProjectCard
          key={project.id}
          onClick={() => handleSelect(project.id)}
          project={project}
        />
      ))}
    </div>
  );
};

export default SelectProject;
