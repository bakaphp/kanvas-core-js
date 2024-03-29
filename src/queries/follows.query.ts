import { gql } from '@apollo/client/core';

export const IS_FOLLOWING_QUERY = gql`
  query isFollowing($user_id: Int!) {
    isFollowing(user_id: $user_id)
  }
`;

export const GET_FOLLOWERS_QUERY = gql`
  query getFollowers($user_id: Int!) {
    getFollowers(user_id: $user_id) {
      data {
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
  }
`;

export const GET_FOLLOWING_QUERY = gql`
  query getFollowing($user_id: Int!) {
    getFollowing(user_id: $user_id) {
      data {
        id
        users_id
        entity_namespace
        entity_id
        entity {
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
    }
  }
`;

export const GET_TOTAL_FOLLOWERS_QUERY = gql`
  query getTotalFollowers($user_id: Int!) {
    getTotalFollowers(user_id: $user_id)
  }
`;
