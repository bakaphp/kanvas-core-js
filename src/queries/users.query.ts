import { gql } from '@apollo/client/core';

export const GET_USER_DATA_QUERY = gql`
  query {
    me {
      id
      uuid
      firstname
      lastname
      displayname
      default_company
      default_company_branch
      email
      branches {
        id
        name
        phone
      }
      companies {
        id
        name
        uuid
      }
      contact {
        phone_number
        cell_phone_number
      }
      roles
      abilities
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
      }
    }
  }
`;

export const GET_ROLE_ID_BY_NAME_QUERY = gql`
  query GetRolesByName($where: QueryRolesWhereWhereConditions!) {
    roles(where: $where) {
      data {
        id
      }
    }
  }
`;

export const GET_USERS_INVITES_QUERY = gql`
  query UsersInvites($first: Int!) {
    usersInvites(first: $first) {
      data {
        email
        id
        invite_hash
      }
    }
  }
`;
