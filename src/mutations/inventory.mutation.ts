import { gql } from '@apollo/client/core';

export const CREATE_PRODUCT = gql`
  mutation($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      slug
      description
      variants {
        id
        name
        attributes {
          name
          value
        }
        warehouses {
          id
        }
      }
    }
  }
`;
