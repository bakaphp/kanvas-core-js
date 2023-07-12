import { gql } from '@apollo/client/core';

export const GET_USER_DATA_QUERY = gql`
  query {
    me {
      id
      uuid
      firstname
      lastname
      displayname
      email
      branches {
        id
        name
        companies_id
        phone
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
