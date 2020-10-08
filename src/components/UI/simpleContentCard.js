import styled from "styled-components";
import React from "react";

const SimpleCard = styled.div`
  background-color: #050b10;
  b-webkit-box-shadow: 3px 3px 5px 6px rgba(15, 15, 15, 0.4);
  -moz-box-shadow: 3px 3px 5px 6px rgba(15, 15, 15, 0.4);
  box-shadow: 3px 3px 5px 6px rgba(15, 15, 15, 0.4);

  .header {
    padding: 0 20px;
    border-bottom: 1px solid #1f1f1f;
    background-color: #050b10;
    h1 {
      padding-top: 10px;
      color: #dcdcdc;
      text-align: left;
    }
  }
  .content {
    padding: 20px;
    border-bottom: 1px solid #1f1f1f;
    background-color: #050b10;

    input,
    textarea,
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
    .ant-select-dropdown {
      border: none;
      border-bottom: 1px solid #1f1f1f;
      background-color: #050b10;
      color: white;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    padding-bottom: 10px;
    background-color: #050b10;
  }
`;

export default SimpleCard;
