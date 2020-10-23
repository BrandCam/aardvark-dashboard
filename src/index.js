import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";
import { UserContextProvider } from "./HOC/Context/LoginContext";
import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = new WebSocketLink({
  // uri: process.env.REACT_APP_WS_SERVER,
  uri: "wss://aardvark-backend.herokuapp.com/subscriptions",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem("token"),
    },
  },
});

const httpLink = createHttpLink({
  // uri: process.env.REACT_APP_GQL_SERVER,
  uri: "https://aardvark-backend.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  const guestToken = localStorage.getItem("guestToken");
  return {
    headers: {
      ...headers,
      authorization: token ? token : guestToken ? guestToken : "",
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// APOLLO CONNECTION TEST
// client
//   .query({
//     query: gql`
//       query GetUser {
//         getUser(email: "test10@test.com") {
//           id
//           projects {
//             id
//             title
//           }
//           email
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
