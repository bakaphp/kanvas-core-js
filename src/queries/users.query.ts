import { gql } from '@apollo/client/core';

export const GET_USER_BY_DISPLAYNAME = gql`
  query getUserByDisplayName(
    $displayName: String!
  ) {
    userByDisplayName(displayname: $displayName) {
      id
      uuid
      firstname
      lastname
      displayname
      default_company
      default_company_branch
      email
      welcome
      mainRole
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
      social {
        total_followers
        total_following
        total_blocked
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById(
    $id: ID!
  ) {
   user(id: $id) {
      id
      uuid
      firstname
      lastname
      displayname
      description
      default_company
      default_company_branch
      email
      welcome
      mainRole
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
      social {
        total_followers
        total_following
        total_blocked
      }
    }
  }
`;

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
      default_company_branch_uuid
      default_company_uuid
      email
      welcome
      mainRole
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
        uuid
        url
      }
      social {
        total_followers
        total_following
        total_blocked
        unread_notifications
      }
    }
  }
`;

export const GET_USER_SOCIAL_DATA_QUERY = gql`
  query {
    me {
      id
      uuid
      firstname
      lastname
      displayname
      description
      default_company
      default_company_branch
      default_company_branch_uuid
      default_company_uuid
      email
      welcome
      mainRole
      social {
        total_message
        total_followers
        total_following
        total_blocked
        unread_notifications
      }
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
        uuid
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


export const GET_BLOCKED_USERS = gql`
  query getBlockedUsers(
    $first: Int
    $page: Int
    $whereCondition: QueryBlockedUsersWhereWhereConditions
    $orderBy: [QueryBlockedUsersOrderByOrderByClause!]
  ) {
    blockedUsers(
      first: $first
      page: $page
      where: $whereCondition
      orderBy: $orderBy
    ) {
      data {
        id
        uuid
        email
        displayname
        lastname
        firstname
        description
        default_company
        default_company_branch
        sex
        user_active
        roles
        is_active
        contact {
          phone_number
          cell_phone_number
        }
        photo {
          url
        }
        social {
          total_message
          total_followers
          total_following
          is_following
          is_blocked
          total_blocked
        }
        created_at
        updated_at
      }
      paginatorInfo {
        currentPage
        perPage
        firstItem
        lastItem
        total
        count
        lastPage
        hasMorePages
      }
    }
  }
`;
