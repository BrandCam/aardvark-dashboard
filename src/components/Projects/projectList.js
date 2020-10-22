import React from "react";
import styled from "styled-components";
import ProjectCard from "./projectCard";
import AddCard from "./addProjectCard";
const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  .title {
    width: 250px;
    text-align: left;
    color: #dcdcdc;
    border-bottom: 1px solid #dcdcdc;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const ProjectList = (props) => {
  return (
    <ListWrap>
      <h1 className="title">{props.type}</h1>
      <div className="card-list">
        {props.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {props.type === "Owned" ? <AddCard /> : null}
      </div>
    </ListWrap>
  );
};

export default ProjectList;
