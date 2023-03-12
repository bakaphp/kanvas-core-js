import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      id
      token
      refresh_token
      token_expires
      refresh_token_expires
      time
      timezone
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;