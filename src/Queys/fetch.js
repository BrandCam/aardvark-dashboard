import { gql } from "@apollo/client";

export const LOG_IN = gql`
  query LogIn($email: String!, $password: String!) {
    logInUser(email: $email, password: $password) {
      token
    }
  }
`;

export const GET_USERS_PROJECTS = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      id
      projects {
        id
        title
        owner {
          email
        }
        admins {
          email
        }
      }
    }
  }
`;

export const GET_PROJECT_REPORTS = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      reports {
        id
        summary
        category
        createdAt
        severity
      }
    }
  }
`;

export const GET_FULL_REPORT = gql`
  query GetReport($id: ID!, $project_id: ID!) {
    getReport(id: $id, project_id: $project_id) {
      id
      category
      severity
      description
      summary
      created_by {
        id
        display_name
        email
      }
      img_urls
      video_url
      is_resolved
      createdAt
      comments {
        id
        author {
          id
          display_name
        }
        content
        createdAt
      }
    }
  }
`;
