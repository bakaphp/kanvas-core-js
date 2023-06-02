import { gql } from '@apollo/client/core';

export const roleQuery = gql`
  query getRole {
    roles{
      title,
      name,
      id
    }
  } 
`;

export const hasRoleQuery = gql`
  query($userId: Int! $role: String!){
    hasRole(userId: $userId, role: $role)
  }
`;