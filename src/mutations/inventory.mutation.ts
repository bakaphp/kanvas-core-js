import { gql } from '@apollo/client/core';

export const CREATE_PRODUCT = gql`
  mutation($input: ProductInput!) {
    createProduct(input: $input) {
      id
      products_types_id
      name
      slug
      description
      short_description
      warranty_terms
      upc
      is_published
      price
      categories {
        id
      }
      warehouses {
        id
      }
      variants {
        id
        name
        price
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
