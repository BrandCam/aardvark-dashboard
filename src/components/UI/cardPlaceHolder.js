import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : "")};
  height: ${({ height }) => (height ? height : "")};
  color: ${({ color }) => (color ? color : "")};
  background-color: ${({ background }) => (background ? background : "")};
`;

const PlaceHolder = (props) => {
  return <Wrap {...props}>{props.children}</Wrap>;
};

export default PlaceHolder;
