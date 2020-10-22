import styled from "styled-components";
import React from "react";
import { Tooltip } from "antd";
import ConvertTimestamp from "../../Helpers/dateConversion";

const ChatBubble = styled.div`
  display: flex;
  color: white;
  justify-content: ${(props) => (props.mirrored ? "flex-end" : "")};
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-self: flex-end;
    width: 32px;
    height: 32px;
    background-color: #0a141e;
    padding: 5px;
    margin-bottom: 14px;
    margin-right: 10px;
    border-radius: 50%;
    font-size: 1.3rem;
  }
  p {
    max-width: ${(props) => (props.mirrored ? "70%" : "60%")};
    background-color: ${(props) => (props.mirrored ? "#1690F5" : "#0a141e")};
    padding: 10px;
    border-radius: 10px;
  }
`;

const Bubble = ({ comment, mirrored }) => {
  return (
    <ChatBubble mirrored={mirrored}>
      {!mirrored ? (
        <Tooltip
          placement="left"
          title={comment.author.display_name}
          color="volcano"
        >
          <span>{comment.author.display_name.slice(0, 1).toUpperCase()}</span>
        </Tooltip>
      ) : null}

      <Tooltip
        placement="left"
        title={ConvertTimestamp(parseInt(comment.createdAt))}
        color="#87d068"
      >
        <p>{comment.content}</p>
      </Tooltip>
    </ChatBubble>
  );
};

export default Bubble;
