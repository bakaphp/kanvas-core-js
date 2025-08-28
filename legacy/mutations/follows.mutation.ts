import { gql } from '@apollo/client/core';

export const USER_FOLLOW_MUTATION = gql`
  mutation userFollow($user_id: ID!) {
    userFollow(user_id: $user_id)
  }
`;

export const USER_UNFOLLOW_MUTATION = gql`
  mutation userUnFollow($user_id: ID!) {
    userUnFollow(user_id: $user_id)
  }
`;
