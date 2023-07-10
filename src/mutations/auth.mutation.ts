import { gql } from "@apollo/client/core";

export const LOGIN_MUTATION = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      id
      uuid
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

export const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken($refresh_token: String!) {
    refreshToken(refresh_token: $refresh_token) {
      token
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      hash_key
      new_password
      verify_password
    }
  }
`;
