import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_PROJECTS } from "../Queys/fetch";
import { UserContext } from "../HOC/Context/LoginContext";
import ProjectList from "../components/Projects/projectList";

const SelectProject = (props) => {
  let { state } = useContext(UserContext);
  let { email } = state;
  let { loading, error, data } = useQuery(GET_USERS_PROJECTS, {
    variables: { email: state.email },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <ProjectList
        type="Owned"
        projects={data.getUser.projects.filter(
          (project) => project.owner.email === email
        )}
      />
      <ProjectList
        type="Member Of"
        projects={data.getUser.projects.filter(
          (project) => project.owner.email !== email
        )}
      />
    </>
  );
};

export default SelectProject;
