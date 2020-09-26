import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  HomeOutlined,
  FileAddOutlined,
  TeamOutlined,
  BugOutlined,
  UsergroupAddOutlined,
  SwitcherOutlined,
  SettingOutlined,
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
          <HomeOutlined />
          <span>Home</span>
          <Link to="/home" />
        </Item>
        <SubMenu key="sub1" icon={<BugOutlined />} title="Reports">
          <Item key="2">
            <Link to="/reports/bugs" />
            Bugs
          </Item>
          <Item key="3">
            <Link to="/reports/Other" />
            Other
          </Item>
        </SubMenu>
        <Item key="4" icon={<DesktopOutlined />}>
          Option 2
          <Link to="/project-board" />
        </Item>
        <Item key="8">
          <SwitcherOutlined />
          <span>Projects</span>
          <Link to="/projects" />
        </Item>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team Mates">
          <Item key="5">Tom</Item>
          <Item key="6">Bill</Item>
          <Item key="7">Alex</Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<UsergroupAddOutlined />} title="Invite">
          <Item key="11">
            Invite Team Mate
            <Link to="/invite/team" />
          </Item>
          <Item key="12">
            Invite Guest
            <Link to="/invite/guest" />
          </Item>
        </SubMenu>
        <Item key="10">
          <FileAddOutlined />
          <span>Create Report</span>
          <Link to="/create-report" />
        </Item>
        <Item key="13">
          <SettingOutlined />
          <span>Options</span>
          <Link to="/settings" />
        </Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
