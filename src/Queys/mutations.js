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
    $guest_creator: String
  ) {
    createReport(
      project_id: $project_id
      category: $category
      severity: $severity
      summary: $summary
      description: $description
      img_urls: $img_urls
      video_url: $video_url
      guest_creator: $guest_creator
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
      guest_creator
      createdAt
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($project_id: ID!, $report_id: ID!, $content: String!) {
    createComment(
      project_id: $project_id
      report_id: $report_id
      content: $content
    ) {
      id
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

const CREATE_CHAT_COMMENT = gql`
  mutation createChatComment($project_id: ID!, $content: String!) {
    createChatComment(project_id: $project_id, content: $content) {
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

const CREATE_PROJECT = gql`
  mutation createProject($title: String!) {
    createProject(title: $title) {
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
`;

const EDIT_USER = gql`
  mutation updateUser($display_name: String!) {
    updateUser(display_name: $display_name) {
      token
    }
  }
`;

const EDIT_REPORT = gql`
  mutation updateReport(
    $id: ID!
    $project_id: ID!
    $category: String
    $img_urls: [String]
    $video_url: String
    $is_resolved: Boolean
    $description: String
    $summary: String
    $severity: String
  ) {
    updateReport(
      id: $id
      project_id: $project_id
      category: $category
      img_urls: $img_urls
      video_url: $video_url
      is_resolved: $is_resolved
      description: $description
      summary: $summary
      severity: $severity
    ) {
      id
      category
      description
      summary
      severity
      img_urls
      video_url
      is_resolved
    }
  }
`;

const PICK_UP_REPORT = gql`
  mutation pickUpReport($project_id: ID!, $id: ID!) {
    pickUpReport(project_id: $project_id, id: $id) {
      id
      worked_by {
        id
        email
        display_name
      }
    }
  }
`;

const DROP_REPORT = gql`
  mutation dropReport($project_id: ID!, $id: ID!) {
    dropReport(project_id: $project_id, id: $id) {
      id
      worked_by {
        id
        email
        display_name
      }
    }
  }
`;

const EDIT_COMMENT = gql`
  mutation updateComment(
    $id: ID
    $project_id: ID
    $report_id: ID
    $content: String
  ) {
    updateComment(
      id: $id
      project_id: $project_id
      report_id: $report_id
      content: $content
    ) {
      id
      content
    }
  }
`;

const ADD_ADMIN = gql`
  mutation addAdmin($admin_email: String!, $id: ID!) {
    updateProject(admin_email: $admin_email, id: $id) {
      id
      admins {
        email
        display_name
      }
    }
  }
`;

const ADD_GUEST = gql`
  mutation addGuest($guest_email: String!, $id: ID!) {
    updateProject(guest_email: $guest_email, id: $id) {
      id
      guests
    }
  }
`;
export {
  CREATE_USER,
  ADD_ADMIN,
  ADD_GUEST,
  CREATE_REPORT,
  CREATE_COMMENT,
  CREATE_CHAT_COMMENT,
  CREATE_PROJECT,
  EDIT_USER,
  EDIT_REPORT,
  PICK_UP_REPORT,
  DROP_REPORT,
  EDIT_COMMENT,
};
