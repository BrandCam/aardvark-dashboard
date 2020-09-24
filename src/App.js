import React from "react";
import "./App.css";
import { Route, Switch, Link, Router } from "react-router-dom";
import Sidebar from "./components/sidebar";
import SignIn from "./pages/signIn";
import Home from "./pages/home";
import { Button } from "antd";
import { Layout } from "antd";
import CreateReport from "./pages/createReport";

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
              <Route path="/create-report">
                <CreateReport />
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
