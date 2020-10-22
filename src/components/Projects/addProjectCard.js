import React, { useState } from "react";
import styled from "styled-components";
import AddProjectForm from "./addProjectForm";
import ContentCard from "../contentCard";
import { PlusCircleOutlined } from "@ant-design/icons";

const MyPlusCircle = styled(PlusCircleOutlined)``;

const CardContent = styled.div`
  cursor: ${({ isEdditing }) => (isEdditing ? "" : "pointer")};
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0a141e;

  ${MyPlusCircle} {
    font-size: 3rem;
    color: #1690f5;
    transition: all 1s ease;
  }

  &:hover ${MyPlusCircle} {
    font-size: 4rem;
    transform: rotate(90deg);
  }
`;

const AddCard = (props) => {
  let [isEdditing, setIsEdditing] = useState(false);
  const handelStartEdditing = () => {
    setIsEdditing(true);
  };
  const handelCancelEdditiong = () => {
    setIsEdditing(false);
  };

  return (
    <ContentCard active={isEdditing} animated>
      <CardContent
        isEdditing={isEdditing}
        onClick={isEdditing ? null : handelStartEdditing}
      >
        {isEdditing ? (
          <AddProjectForm
            isEdditing={isEdditing}
            cancel={handelCancelEdditiong}
          />
        ) : (
          <MyPlusCircle />
        )}
      </CardContent>
    </ContentCard>
  );
};

export default AddCard;
