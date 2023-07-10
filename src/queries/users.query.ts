import { gql } from '@apollo/client/core';

export const GET_USER_DATA_QUERY = gql`
  query {
    me {
      id
      uuid
      firstname
      lastname
      displayname
      branches {
        id
        name
        companies_id
        phone
        company {
          name
          id
        }
      }
      companies {
        id
        name
      }
      roles
      abilities
    }
  }
`;
