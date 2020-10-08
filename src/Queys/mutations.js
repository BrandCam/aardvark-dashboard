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

const CREATE_REPORT = gql`
  mutation CreateReport(
    $project_id: ID!
    $category: String!
    $severity: String!
    $summary: String!
    $description: String!
    $img_urls: [String]
    $video_url: String
  ) {
    createReport(
      project_id: $project_id
      category: $category
      severity: $severity
      summary: $summary
      description: $description
      img_urls: $img_urls
      video_url: $video_url
    ) {
      id
      summary
      category
      description
      severity
      img_urls
      video_url
      is_resolved
      created_by {
        id
        display_name
        email
      }
      createdAt
    }
  }
`;

const EDIT_USER = gql`
  mutation updateUser($display_name: String!) {
    updateUser(display_name: $display_name) {
      token
    }
  }
`;
export { CREATE_USER, CREATE_REPORT, EDIT_USER };
