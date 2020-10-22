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
          display_name
          email
        }
        admins {
          display_name
          email
        }
      }
    }
  }
`;

export const GET_CHAT = gql`
  query GetChat($project_id: ID!) {
    getChat(project_id: $project_id) {
      id
      author {
        id
        display_name
      }
      content
      createdAt
    }
  }
`;

export const GET_PROJECT_REPORTS = gql`
  query filteredReports(
    $id: ID!
    $category: String
    $severity: [String]
    $order: Int
    $limit: Int
    $page: Int
    $is_resolved: Boolean
  ) {
    getProject(id: $id) {
      reports(
        category: $category
        severity: $severity
        order: $order
        limit: $limit
        page: $page
        is_resolved: $is_resolved
      ) {
        reports {
          id
          summary
          category
          createdAt
          severity
        }
        length
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
      guest_creator
      img_urls
      video_url
      is_resolved
      worked_by {
        id
        email
        display_name
      }
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

export const GET_MY_REPORTS = gql`
  query getMyReports($project_id: ID!) {
    getMyReports(project_id: $project_id) {
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
      guest_creator
      img_urls
      video_url
      is_resolved
      worked_by {
        id
        email
        display_name
      }
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

export const GET_REPORT_SUMMARY = gql`
  query summary($project_id: ID!, $type: String!) {
    getReportsSummary(project_id: $project_id, type: $type) {
      New
      Minor
      Major
      Breaking
    }
  }
`;

export const GET_TESTER_SUMMARY = gql`
  query getTesterSummary($project_id: ID!) {
    getTesterSummary(project_id: $project_id) {
      sent
      feedback
      per
    }
  }
`;

export const GET_PROJECT_MEMBERS = gql`
  query getProject($id: ID!) {
    getProject(id: $id) {
      id
      admins {
        display_name
        email
      }
      owner {
        display_name
        email
      }
    }
  }
`;
