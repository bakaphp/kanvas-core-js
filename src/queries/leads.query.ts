import { gql } from '@apollo/client/core';

export const GET_ALL_LEADS_QUERY = gql`
  query {
    leads {
      data {
        id
        uuid
        title
        company {
          id
        }
        people {
          name
          contacts {
            type {
              name
            }
            value
          }
        }
        receiver {
          name
          uuid
        }
        status {
          name
        }
        type {
          name
        }
        source {
          name
        }
        pipeline {
          name
        }
        stage {
          name
        }
        custom_fields {
          data {
            name
            value
          }
        }
      }
    }
  }
`;
