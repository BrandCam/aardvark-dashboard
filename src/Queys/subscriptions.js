import { gql } from "@apollo/client";

export const COMMENT_ADDED = gql`
  subscription commentAdded($project_id: ID, $report_id: ID!) {
    commentAdded(project_id: $project_id, report_id: $report_id) {
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

export const CHAT_COMMENT_ADDED = gql`
  subscription chatCommentAdded($project_id: ID!) {
    chatCommentAdded(project_id: $project_id) {
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
