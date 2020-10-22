import styled from "styled-components";

const ControlWrap = styled.div`
  background-color: #121212;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-self: center;
  h1 {
    color: white;
  }
  .ant-collapse {
    background: #242424;
    border: none;
    .ant-collapse-header {
      color: white;
    }
    .ant-collapse-item {
      border-bottom: 1px solid #40a9ff;
    }
    .ant-collapse-content {
      color: white;
      background: #40a9ff;
      border: none;
    }

    /* Checkbox */
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #121212;
      border-color: #121212;
    }

    /* Radio */
    .ant-radio-inner {
      border-color: #606060;
    }
    .ant-radio-inner:after {
      background-color: #242424;
    }
  }
`;

export default ControlWrap;
