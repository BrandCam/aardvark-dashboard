import React, { useState } from "react";
import { Button, Layout } from "antd";
import { MessageTwoTone, MinusOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const MsgSider = (props) => {
  let [collapsed, setCollapsed] = useState(true);
  return (
    <aside
      collapsible
      collapsed={collapsed}
      style={{
        position: "fixed",
        right: 0,
        display: "flex",
        width: `${collapsed ? "" : "20%"}`,
        height: `${collapsed ? "" : "100vh"}`,
        flexWrap: "wrap",
        justifyContent: "space-around",
        backgroundColor: `${collapsed ? "" : "#eee"}`,
        borderRadius: "10px",
      }}
    >
      {collapsed ? "" : "open"}

      {collapsed ? (
        <MessageTwoTone
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "sticky",
            fontSize: "48px",
            backgroundColor: "#001427",
          }}
        />
      ) : (
        <Button onClick={() => setCollapsed(!collapsed)}>
          <MinusOutlined />
        </Button>
      )}
    </aside>
  );
};

export default MsgSider;
