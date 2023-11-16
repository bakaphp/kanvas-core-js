import { gql } from '@apollo/client/core';

export const ASSIGN_ROLE_USER = gql`
  mutation($userId: ID!, $role: Mixed!) {
    assignRoleToUser(userId: $userId, role: $role)
  }
`;

export const REMOVE_ROLE_USER = gql`
  mutation($userId: ID!, $role: Mixed!) {
    removeRole(userId: $userId, role: $role)
  }
`;
