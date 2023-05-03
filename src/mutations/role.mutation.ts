import { gql } from "@apollo/client/core";

export const createRoleMutation = gql`
  mutation($name: String!, $title: String!) {
    createRole(name: $name, title: $title) {
      id,
      name,
      title
    }
  }
`;

export const updateRoleMutation = gql`
  mutation($id: Int!, $name: String!, $title: String!) {
    updateRole(id: $id, name: $name, title: $title) {
      id,
      name,
      title
    }
  }
`;

export const removeRoleMutation = gql`
  mutation($id: Int!, $name: String!, $title: String!) {
    removeRole(id: $id, name: $name, title: $title)
  }
`;

export const assignRoleMutation = gql`
  mutation($userId: Int!, $role: String!) {
    assignRoleToUser(
        userId: $userId,
        role: $role
    )
  }
`;