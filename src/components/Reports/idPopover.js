import React from "react";
import styled from "styled-components";
import { Popover } from "antd";

export const MyPopover = styled(Popover)`
  /*You cant use this to style the pop-over lmao
    Styles are in index
  */
`;

export const IdPopoverContent = (props) => {
  return <p>{props.id}</p>;
};
