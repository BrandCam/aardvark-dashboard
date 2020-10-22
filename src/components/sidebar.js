import React, { useState, useContext, useEffect } from "react";
import { UserContext, actionTypes } from "../HOC/Context/LoginContext";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_PROJECT_MEMBERS } from "../Queys/fetch";
import { Layout, Menu, Button } from "antd";
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
import { Link, useLocation, useHistory } from "react-router-dom";
import LogoIcon, { Myimg } from "./UI/logo";

const Logo = styled.div`
  position: relative;
  margin-left: ${({ collapsed }) => (collapsed ? "0px" : "")};
  font-family: digital-dream;
  letter-spacing: 2px;

  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #121212;
  border: 3px solid #242424;
  margin: 16px;

  div {
    z-index: 5;
    position: absolute;
  }
  ${Myimg} {
    transition: opacity 1s ease;
    opacity: ${({ collapsed }) => (collapsed ? "1" : "0.3")};
    width: 80px;
    height: 50px;
  }
  &::after {
    transition: opacity 2s ease;
    transition: height 1s linear;
    overflow: hidden;
    color: white;
    margin-top: 3px;
    height: ${({ collapsed }) => (collapsed ? "0px" : "40px")};
    width: ${({ collapsed }) => (collapsed ? "0px" : "")};
    opacity: ${({ collapsed }) => (collapsed ? "0" : "0.8")};
    content: "Aardvark";
  }
`;
const { LOG_OUT } = actionTypes;
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const Sidebar = (props) => {
  let [members, setMembers] = useState([]);
  let { state, dispatch } = useContext(UserContext);
  let { loggedIn, project, email } = state;
  let { data, refetch, networkStatus } = useQuery(GET_PROJECT_MEMBERS, {
    variables: { id: project },
    notifyOnNetworkStatusChange: true,
  });
  let [collapsed, setCollapsed] = useState(true);
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    if (data && data.getProject) {
      let {
        getProject: { admins, owner },
      } = data;
      let members = [owner, ...admins];
      setMembers(members.filter((memb) => memb.email !== email));
    }
  }, [data, email]);

  if (!loggedIn) {
    return null;
  }

  if (loggedIn) {
    return (
      <Sider
        collapsible="true"
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
        style={{
          overflow: "auto",
          height: "100vh",
          left: 0,
        }}
      >
        <Logo collapsed={collapsed}>
          <LogoIcon style={{}} />
        </Logo>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
        >
          <Item disabled={!project} key="/home">
            <HomeOutlined />
            <span>Home</span>
            <Link to="/home" />
          </Item>
          <SubMenu
            disabled={!project}
            key="sub1"
            icon={<BugOutlined />}
            title="Reports"
          >
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
          <SubMenu
            disabled={!project}
            key="sub2"
            icon={<TeamOutlined />}
            title="Team Mates"
          >
            {members.length ? (
              members.map((member) => (
                <Item disabled key={member.email}>
                  {member.display_name}
                </Item>
              ))
            ) : (
              <Item disabled key="sad">
                No friends? Me too.
              </Item>
            )}
            <Item onClick={() => refetch({ id: project })}>
              {networkStatus === NetworkStatus.refetch ? "Fetching" : "Refresh"}
            </Item>
          </SubMenu>
          <SubMenu
            disabled={!project}
            key="sub4"
            icon={<UsergroupAddOutlined />}
            title="Invite"
          >
            <Item key="/invite/team">
              Invite Team Mate
              <Link to="/invite/team" />
            </Item>
            <Item key="/invite/guest">
              Send Link
              <Link to="/invite/guest" />
            </Item>
          </SubMenu>
          <Item disabled={!project} key="/create-report">
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
        <Button
          style={{
            width: "100%",
            padding: "0px",
          }}
          onClick={() => {
            dispatch({ type: LOG_OUT });
            history.push("/");
          }}
          type={collapsed ? "text" : ""}
          ghost={!collapsed}
          danger
        >
          Sign Out
        </Button>
      </Sider>
    );
  }
};

export default Sidebar;
