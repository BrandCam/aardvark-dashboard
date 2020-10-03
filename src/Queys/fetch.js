import { gql } from "@apollo/client";

export const LOG_IN = gql`
  query LogIn($email: String!, $password: String!) {
    logInUser(email: $email, password: $password) {
      token
    }
  }
`;
