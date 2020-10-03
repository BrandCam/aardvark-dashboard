import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { UserContextProvider } from "./HOC/Context/LoginContext";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
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
