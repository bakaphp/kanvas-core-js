import { gql } from "@apollo/client/core";

export const MESSAGE_COMMENT_MUTATION = gql`
  mutation addComment($input: CommentInput!) {
    addComment(input: $input) {
      comments {
        message
        id
        parent {
          id
          message
        }
      }
    }
  }
`;

export const MESSAGE_COMMENT_UPDATE_MUTATION = gql`
  mutation updateComment($id: ID!, $input: CommentInput!) {
    updateComment(id: $id, input: $input) {
      comments {
        message
        id
        parent {
          id
          message
        }
      }
    }
  }
`;

export const MESSAGE_COMMENT_DELETE_MUTATION = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id)
  }
`;
