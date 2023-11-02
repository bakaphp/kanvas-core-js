import { gql } from '@apollo/client';

export const ASSIGN_ROLE_USER = gql`
  mutation($userId: ID!, $role: Mixed!) {
    assignRoleToUser(userId: $userId, role: $role)
  }
`;
