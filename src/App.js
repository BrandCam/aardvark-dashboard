import React from "react";
import {
  Home,
  SignIn,
  CreateReport,
  SelectProject,
  Reports,
  Board,
  Invite,
  Settings,
} from "./pages/Index";
import "./App.css";
import { Route, Switch, Link, Router } from "react-router-dom";
import Sidebar from "./components/sidebar";

import { Button } from "antd";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

function App() {
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
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/projects">
                <SelectProject />
              </Route>
              <Route path="/reports/bugs">
                <Reports type="bugs" />
              </Route>
              <Route path="/reports/other">
                <Reports type="other" />
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
              <Route path="/">
                <SignIn />
              </Route>
            </Switch>
          </Content>
          <Footer style={{ backgroundColor: "#001427", color: "white" }}>
            Footer
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
