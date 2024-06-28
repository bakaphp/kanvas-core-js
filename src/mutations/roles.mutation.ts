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

export const CREATE_ROLE = gql`
  mutation createRole($name: String!) {
    createRole(name: $name) {
      id
      name
      scope
      userCount
      abilitiesCount
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($id: ID!, $name: String, $title: String) {
    updateRole(id: $id, name: $name, title: $title) {
      id
      name
      title
      scope
      userCount
      abilitiesCount
    }
  }
`;
