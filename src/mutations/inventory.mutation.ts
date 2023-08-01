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
      categories {
        id
      }
      warehouses {
        id
      }
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
