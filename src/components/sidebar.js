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
import { Link, useLocation } from "react-router-dom";

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
  let location = useLocation();

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
      <Menu
        theme="dark"
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
      >
        <Item key="/home">
          <HomeOutlined />
          <span>Home</span>
          <Link to="/home" />
        </Item>
        <SubMenu key="sub1" icon={<BugOutlined />} title="Reports">
          <Item key="/reports/bugs">
            <Link to="/reports/bugs" />
            Bugs
          </Item>
          <Item key="/reports/Other">
            <Link to="/reports/Other" />
            Other
          </Item>
        </SubMenu>
        <Item key="/project-board" disabled icon={<DesktopOutlined />}>
          Project Plan
          <Link to="/project-board" />
        </Item>
        <Item key="/projects">
          <SwitcherOutlined />
          <span>Projects</span>
          <Link to="/projects" />
        </Item>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team Mates">
          <Item disabled key="5">
            Tom
          </Item>
          <Item disabled key="6">
            Bill
          </Item>
          <Item disabled key="7">
            Alex
          </Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<UsergroupAddOutlined />} title="Invite">
          <Item key="/invite/team">
            Invite Team Mate
            <Link to="/invite/team" />
          </Item>
          <Item key="/invite/guest">
            Invite Guest
            <Link to="/invite/guest" />
          </Item>
        </SubMenu>
        <Item key="/create-report">
          <FileAddOutlined />
          <span>Create Report</span>
          <Link to="/create-report" />
        </Item>
        <Item key="/settings">
          <SettingOutlined />
          <span>Options</span>
          <Link to="/settings" />
        </Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
