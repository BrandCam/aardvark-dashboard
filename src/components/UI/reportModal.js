import styled from "styled-components";
import { Modal } from "antd";

const ReportModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-header,
  .ant-modal-footer,
  .ant-modal-title {
    color: white;
  }

  .ant-modal-content {
    background-color: #141414;
  }
  .ant-modal-header {
    background-color: #141414;
    border-bottom: 1px solid #262626;
  }
  .ant-modal-footer {
    border-top: 1px solid #262626;
  }
  .ant-modal-close {
    color: #dcdcdc;
  }
  .ant-modal-close:hover {
    color: #40a9ff;
  }
`;

export default ReportModal;
