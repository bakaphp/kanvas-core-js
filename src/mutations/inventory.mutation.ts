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
        status {
          id
        }
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

export const DELETE_PRODUCT = gql`
  mutation($id: Int!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_VARIANT = gql`
  mutation($id: ID!, $input: VariantsUpdateInput!) {
    updateVariant(id: $id, input: $input) {
      id
      products_id
      name
      description
      short_description
      html_description
      status {
        id
      }
      attributes {
        name
        value
      }
      warehouses {
        id
        warehouseinfo {
          id
          name
        }
      }
      sku
      ean
    }
  }
`;
