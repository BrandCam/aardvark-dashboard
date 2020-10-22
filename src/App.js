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
  GuestSubmit,
} from "./pages/Index";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./HOC/Routing/privateRoute";
import Sidebar from "./components/sidebar";
import { UserContext } from "./HOC/Context/LoginContext";
import { Layout } from "antd";
import MsgSider from "./components/SideMsgs/MsgSider";

const { Footer, Content } = Layout;

function App() {
  let { state } = useContext(UserContext);
  let { loggedIn, project } = state;
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
              <PrivateRoute path="/projects">
                <SelectProject />
              </PrivateRoute>
              <PrivateRoute path="/reports/bugs">
                <Reports type="Bug" />
              </PrivateRoute>
              <PrivateRoute path="/reports/other">
                <Reports type="Suggestion" />
              </PrivateRoute>
              <PrivateRoute path="/project-board">
                <Board />
              </PrivateRoute>
              <PrivateRoute path="/invite/team">
                <Invite type="team" />
              </PrivateRoute>
              <PrivateRoute path="/invite/guest">
                <Invite type="guest" />
              </PrivateRoute>
              <PrivateRoute path="/create-report">
                <CreateReport />
              </PrivateRoute>
              <Route path="/guest/create-report">
                <GuestSubmit />
              </Route>
              <PrivateRoute path="/projects">
                <SelectProject />
              </PrivateRoute>
              <PrivateRoute path="/settings">
                <Settings />
              </PrivateRoute>
              <Route path="/new-user">
                {loggedIn ? <Redirect to="/" /> : <CreateAccount />}
              </Route>
              <Route path="/">
                {loggedIn ? (
                  project ? (
                    <Home />
                  ) : (
                    <Redirect to="/projects" />
                  )
                ) : (
                  <SignIn />
                )}
              </Route>
            </Switch>
          </Content>
          <Footer
            style={{ backgroundColor: "#001427", color: "white" }}
          ></Footer>
        </Layout>
        {project ? <MsgSider /> : null}
      </Layout>
    </div>
  );
}

export default App;
