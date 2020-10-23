import React from "react";
import styled from "styled-components";
import { message } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

//** MORE STYLES IN INDEX **//

const Wrap = styled.div`
  display: flex;
`;

const errorCb = (error) => {
  let key = Math.floor(Math.random() * 100000);
  message.error({
    content: (
      <Wrap>
        <span className="error-text"> {error.message}</span>
        <CloseCircleFilled
          onClick={() => message.destroy(key)}
          className="error-close"
        />
      </Wrap>
    ),
    className: "error-pop",
    style: {
      marginTop: "50vh",
    },
    icon: " ",
    duration: 0,
    key: key,
  });
};

export default errorCb;
