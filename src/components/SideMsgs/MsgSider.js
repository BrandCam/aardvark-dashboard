import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../HOC/Context/LoginContext";
import { useQuery } from "@apollo/client";
import { GET_CHAT } from "../../Queys/fetch";
import { CHAT_COMMENT_ADDED } from "../../Queys/subscriptions";
import { MessageTwoTone } from "@ant-design/icons";
import ChatBody from "../chatBox/chatBody";
import ChatDrawer from "../chatBox/chatDrawer";
import SideMsgInput from "./sideMsgInput";
import errorCb from "../../Helpers/errorPopup";

const MsgSider = (props) => {
  let { state } = useContext(UserContext);
  let { data, subscribeToMore, refetch, error } = useQuery(GET_CHAT, {
    variables: { project_id: state.project },
  });
  let [collapsed, setCollapsed] = useState(true);

  useEffect(() => {}, []);
  let handelOpen = () => {
    setCollapsed(false);
    refetch();
  };

  useEffect(() => {
    if (error) {
      errorCb(error);
    }
  }, [error]);

  let handleSubscribe = () => {
    return subscribeToMore({
      document: CHAT_COMMENT_ADDED,
      variables: { project_id: state.project },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newComment = subscriptionData.data.chatCommentAdded;

        return { ...prev, getChat: [...prev.getChat, newComment] };
      },
    });
  };

  return (
    <aside
      collapsible
      collapsed={collapsed}
      style={{
        position: "fixed",
        right: 0,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        borderRadius: "10px",
      }}
    >
      <ChatDrawer
        destroyOnClose={true}
        width="400px"
        height="100%"
        title="Group Chat"
        mask={false}
        placement="right"
        onClose={() => {
          setCollapsed(true);
        }}
        visible={!collapsed}
        key="bottom"
        footer={<SideMsgInput />}
      >
        {data ? (
          <ChatBody
            subscribe={handleSubscribe}
            comments={data.getChat}
          ></ChatBody>
        ) : null}
      </ChatDrawer>

      {collapsed ? (
        <MessageTwoTone
          onClick={handelOpen}
          style={{
            position: "sticky",
            fontSize: "48px",
            backgroundColor: "#001427",
          }}
        />
      ) : null}
    </aside>
  );
};

export default MsgSider;
