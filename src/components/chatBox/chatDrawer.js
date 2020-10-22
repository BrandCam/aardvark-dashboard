import styled from "styled-components";
import { Drawer } from "antd";

const ChatDrawer = styled(Drawer)`
  &.ant-drawer-bottom {
    left: 50px;
    width: 400px;
  }
  .ant-drawer-content {
    background-color: #000001;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
  }
  .ant-drawer-header {
    background-color: #000001;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    border-bottom: 1px solid rgb(20, 20, 20);
    padding-left: 10px;
    .ant-drawer-title {
      color: white;
    }
    .ant-drawer-close {
      color: #1690f5;
    }
  }
  .ant-drawer-body {
    padding-left: 10px;
  }
  .ant-drawer-body::-webkit-scrollbar-track {
    background: #000001;
  }

  .ant-drawer-body::-webkit-scrollbar {
    width: 10px;
  }

  .ant-drawer-body::-webkit-scrollbar-thumb {
    background-color: #39ff14;
  }
  .ant-drawer-footer {
    border-top: 1px solid rgb(20, 20, 20);
    padding-left: 10px;
  }
`;
export default ChatDrawer;
