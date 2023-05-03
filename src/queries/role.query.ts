import { gql } from '@apollo/client/core';

export const roleQuery = gql`
  query getRole {
    roles{
      title,
      name,
      id
    }
  } 
`;