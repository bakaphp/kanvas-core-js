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

export const UPDATE_PRODUCT = gql`
  mutation($input: ProductInputUpdate, $id: Int!) {
    updateProduct(id: $id, input: $input) {
      products_types_id
      name
      description
      productsTypes {
        id
        name
      }
      short_description
      html_description
      warranty_terms
      upc
      is_published
    }
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
        status_history {
          id
          name
          from_date
        }
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

export const UPDATE_VARIANT_IN_WAREHOUSE = gql`
  mutation($id: ID!, $input: VariantsWarehousesInput!) {
    updateVariantInWarehouse(id: $id, input: $input) {
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
        status_history {
          id
          name
          from_date
        }
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
