import { gql } from "@apollo/client/core";

export const IS_FOLLOWING_QUERY = gql`
  query isFollowing($user_id: ID!) {
    isFollowing(user_id: $user_id)
  }
`;

export const GET_FOLLOWERS_QUERY = gql`
  query getFollowers($user_id: ID!) {
    getFollowers(user_id: $user_id) {
      data {
        id
        uuid
        firstname
        lastname
        displayname
        description
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
        social {
          total_message
          total_followers
          total_following
          is_following
          is_blocked
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
  query getFollowing($user_id: ID!) {
    getFollowing(user_id: $user_id) {
      data {
        id
        uuid
        firstname
        lastname
        displayname
        description
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
        social {
          total_message
          total_followers
          total_following
          is_following
          is_blocked
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

export const GET_FOLLOWING_ENTITY_QUERY = gql`
  query getFollowingEntity($user_id: ID!) {
    getFollowingEntity(user_id: $user_id) {
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
          description
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
          social {
            total_message
            total_followers
            total_following
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
  query getTotalFollowers($user_id: ID!) {
    getTotalFollowers(user_id: $user_id)
  }
`;

export const USER_RECOMMENDATIONS_QUERY = gql`
  query getWhoToFollow($user_id: ID!, $static_recommendation: Boolean!) {
    getWhoToFollow(user_id: $user_id, static_recommendation: $static_recommendation) {
      data {
            id
            uuid
            firstname
            lastname
            displayname
            description
            dob
            default_company
            default_company_uuid
            default_company_branch
            default_company_branch_uuid
            email
            is_active
            verify_two_factor
            sex
            user_active
            timezone
            abilities
            roles
            mainRole
            welcome
            created_at
            updated_at
            photo {
                url
            }
            social{
                total_message
                total_like
                total_followers
                total_following
                total_blocked
                total_lists
                is_following
                is_blocked
            }
        }
    }
  }
`;
