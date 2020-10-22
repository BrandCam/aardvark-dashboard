import React from "react";
import LogoSvg from "../../res/logo.svg";
import styled from "styled-components";

export const Myimg = styled.img``;
const LogoIcon = (props) => (
  <div {...props}>
    <Myimg src={LogoSvg} {...props} />
  </div>
);
export default LogoIcon;
