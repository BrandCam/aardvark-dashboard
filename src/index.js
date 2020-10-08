import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";
import { UserContextProvider } from "./HOC/Context/LoginContext";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
