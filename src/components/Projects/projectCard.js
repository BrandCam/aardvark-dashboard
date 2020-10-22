import React, { useContext } from "react";
import { UserContext, actionTypes } from "../../HOC/Context/LoginContext";

import ContentCard from "../contentCard";

const ProjectCard = ({ project }) => {
  let { state, dispatch } = useContext(UserContext);

  const handleSelect = (id) => {
    dispatch({ type: actionTypes.SET_PROJECT, payload: id });
  };

  return (
    <ContentCard
      active={project.id === state.project}
      animated={project.id !== state.project}
      onClick={
        project.id === state.project ? null : () => handleSelect(project.id)
      }
    >
      <div
        style={{
          cursor: "pointer",
          width: "300px",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: project.id === state.project ? "#0a141e" : "",
        }}
      >
        <h1
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: project.id === state.project ? "3rem" : "2rem",
          }}
        >
          {project.title}
        </h1>
      </div>
    </ContentCard>
  );
};

export default ProjectCard;
