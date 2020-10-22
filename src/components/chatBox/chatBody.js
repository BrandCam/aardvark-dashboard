import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Bubble from "./chatBubble";
import { UserContext } from "../../HOC/Context/LoginContext";

const Wrap = styled.div``;

const ChatBody = ({ comments, subscribe }) => {
  let { state } = useContext(UserContext);
  let bottomChat = useRef(null);
  const { id } = state;

  useEffect(() => {
    if (subscribe) {
      let addComment = subscribe();
      return () => {
        addComment();
      };
    }
  }, [subscribe, state.project]);

  useEffect(() => {
    if (bottomChat.current) {
      bottomChat.current.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    let lastComment = [...comments].pop();
    if (
      bottomChat.current &&
      lastComment &&
      lastComment.author.id === state.id
    ) {
      bottomChat.current.scrollIntoView();
    }
  }, [comments, state.id]);

  return (
    <Wrap>
      {comments.map((comment) => (
        <Bubble
          key={comment.id}
          mirrored={id === comment.author.id}
          comment={comment}
        ></Bubble>
      ))}
      <div ref={bottomChat}></div>
    </Wrap>
  );
};

export default ChatBody;
