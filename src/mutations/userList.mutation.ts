import { gql } from '@apollo/client/core';

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
