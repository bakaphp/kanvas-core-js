import { gql } from "@apollo/client/core";

export const CREATE_USER_LIST = gql`
  mutation createUserList($input: UserListInput!) {
    createUserList(input: $input) {
      id
      slug
      name
      description
      is_public
      is_default
      user {
        id
      }
      company {
        id
        uuid
        name
      }
      items {
        id
        uuid
        message
        user {
          id
          uuid
          displayname
          email
        }
      }
    }
  }
`;

export const UPDATE_USER_LIST = gql`
  mutation updateUserList($id: ID!, $input: UserListInput!) {
    updateUserList(id: $id, input: $input) {
      id
      slug
      name
      description
      is_public
      is_default
      user {
        id
      }
      company {
        id
        uuid
        name
      }
      items {
        id
        uuid
        message
        user {
          id
          uuid
          displayname
          email
        }
      }
    }
  }
`;

export const DELETE_USER_LIST = gql`
  mutation deleteUserList($id: ID!) {
    deleteUserList(id: $id)
  }
`;

export const ADD_USER_LIST_ITEM = gql`
  mutation addToUserList($users_lists_id: ID!, $messages_id: ID!) {
    addToUserList(users_lists_id: $users_lists_id, messages_id: $messages_id)
  }
`;

export const REMOVE_USER_LIST_ITEM = gql`
  mutation removeFromUserList($users_lists_id: ID!, $messages_id: ID!) {
    removeFromUserList(
      users_lists_id: $users_lists_id
      messages_id: $messages_id
    )
  }
`;
