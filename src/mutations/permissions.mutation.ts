import { gql } from "@apollo/client/core";

export const assignToUserMutation = gql`
  mutation($userId: Int! $permission: String!){
    givePermissionToUser(
      usaerId: $userId
      permission: $permission
    )
  }
`;

export const removePermissionMutation = gql`
  mutation($userId: Int! $permission: String!){
    removePermissionToUser(
      userId: $userId
      permission: $permission
    )
  }
`;