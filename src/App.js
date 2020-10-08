import React, { useContext } from "react";
import {
  Home,
  SignIn,
  CreateReport,
  SelectProject,
  Reports,
  Board,
  Invite,
  Settings,
  CreateAccount,
} from "./pages/Index";
import "./App.css";
import { Route, Switch, Link, Router } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { UserContext } from "./HOC/Context/LoginContext";

import { Button } from "antd";
import { Layout } from "antd";
import MsgSider from "./components/SideMsgs/MsgSider";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  let { state } = useContext(UserContext);
  return (
    <div style={{}} className="App">
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Content
            style={{
              borderRadius: "10px",
              backgroundColor: "#001427",
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <Switch>
              <Route path="/projects">
                <SelectProject />
              </Route>
              <Route path="/reports/bugs">
                <Reports type="Bug" />
              </Route>
              <Route path="/reports/other">
                <Reports type="Suggestion" />
              </Route>
              <Route path="/project-board">
                <Board />
              </Route>
              <Route path="/invite/team">
                <Invite type="team" />
              </Route>
              <Route path="/invite/guest">
                <Invite type="guest" />
              </Route>
              <Route path="/create-report">
                <CreateReport />
              </Route>
              <Route path="/projects">
                <SelectProject />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/new-user">
                <CreateAccount />
              </Route>
              <Route path="/">{state.loggedIn ? <Home /> : <SignIn />}</Route>
            </Switch>
          </Content>
          <Footer style={{ backgroundColor: "#001427", color: "white" }}>
            Footer
          </Footer>
        </Layout>
        <MsgSider />
      </Layout>
    </div>
  );
}

export default App;
