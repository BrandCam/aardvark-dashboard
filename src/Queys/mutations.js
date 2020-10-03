import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $display_name: String!
  ) {
    createUser(
      email: $email
      password: $password
      display_name: $display_name
    ) {
      token
    }
  }
`;

export { CREATE_USER };
