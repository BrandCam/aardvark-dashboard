import styled from "styled-components";
import { Drawer } from "antd";
const FormDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    background-color: #141414;
  }
  .ant-drawer-header {
    background-color: #141414;
    border-bottom: 3px solid #1f1f1f;
    .ant-drawer-title {
      color: #cfdcdc;
    }
  }

  input,
  textarea,
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-dropdown {
    border: none;
    border-bottom: 1px solid #1f1f1f;
    background-color: #050b10;
    color: white;
  }
  .ant-select-selection-placeholder {
    color: #525558;
  }
  .ant-upload {
    background-color: #141414;
    color: #cfdcdc;
  }
  span {
    color: #cfdcdc;
  }
  .ant-drawer-footer {
    border-top: 3px solid #1f1f1f;
  }
`;

export default FormDrawer;
