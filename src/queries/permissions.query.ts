import { gql } from "@apollo/client/core";

export const canQuery = gql`
  query($userId: Int! $permission: String!) {
    can(
        userId: $userId
        permission: $permission
    )
  }
`;