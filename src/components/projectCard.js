import React from "react";
import ContentCard from "./contentCard";
const ProjectCard = ({ project, onClick }) => {
  return (
    <ContentCard animated onClick={onClick}>
      <div>
        <h1 style={{ color: "white" }}>{project.title}</h1>
      </div>
    </ContentCard>
  );
};

export default ProjectCard;
