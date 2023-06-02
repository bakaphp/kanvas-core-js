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

export const removeUserRolMutation = gql`
  mutation($userId: Int!, $name: String!) {
    removeRole(userId: $userId, name: $name)
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