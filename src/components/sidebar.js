import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

const Sidebar = (props) => {
  let [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{
        overflow: "auto",
        height: "100vh",
        left: 0,
      }}
    >
      <Logo>{collapsed ? "A" : "Arrdvark"}</Logo>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Item key="1">
          <PieChartOutlined />
          <span>Home</span>
          <Link to="/home" />
        </Item>
        <Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Item key="3">Tom</Item>
          <Item key="4">Bill</Item>
          <Item key="5">Alex</Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Item key="6">Team 1</Item>
          <Item key="8">Team 2</Item>
        </SubMenu>

        <Item key="9">
          <FileOutlined />
          <span>Create Report</span>
          <Link to="/create-report" />
        </Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
