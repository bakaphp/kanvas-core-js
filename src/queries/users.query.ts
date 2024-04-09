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
  query UsersInvites(
    $first: Int!
    $page: Int
    $orderBy: [QueryUsersInvitesOrderByOrderByClause!]
    $where: QueryUsersInvitesWhereWhereConditions
  ) {
    usersInvites(
      first: $first
      orderBy: $orderBy
      page: $page
      where: $where
    ) {
      data {
        email
        firstname
        id
        invite_hash
        role_id
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
        count
      }
    }
  }
`;

export const GET_USERS_INVITES_BY_ROLE_ID_QUERY = gql`
  query UsersInvites(
    $first: Int!
    $where: QueryUsersInvitesWhereWhereConditions!
    $orderBy: [QueryUsersInvitesOrderByOrderByClause!]
  ) {
    usersInvites(first: $first, orderBy: $orderBy, where: $where) {
      data {
        email
        id
        invite_hash
        role_id
      }
    }
  }
`;
