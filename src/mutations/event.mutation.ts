import { gql } from '@apollo/client/core';
export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      id
      name
      type {
        name
      }
      eventStatus {
        id
        name
      }
      versions {
        data {
          id
          name
          agenda
          description
          slug
          dates {
            id
            date
            start_time
            end_time
          }
        }
      }
      category {
        id
        name
        slug
        position
        created_at
        updated_at
      }
      description
    }
  }
`;
