import { gql } from '@apollo/client/core';

export const GET_ALL_PRODUCTS = gql`
  query {
    products {
      data {
        id
        products_types_id
        uuid
        name
        slug
        description
        short_description
        html_description
        warranty_terms
        upc
        is_published
        created_at
        updated_at
        files {
          id
          uuid
          name
          url
          type
          size
          field_name
          attributes
        }
        categories {
          id
          uuid
          name
          slug
        }
        warehouses {
          id
          name
          regions {
            id
            name
          }
        }
        variants {
          id
          uuid
          name
          slug
          description
          products_id
          status {
            id
            name
          }
          warehouses {
            id
            warehouseinfo {
              id
              name
            }
          }
          attributes {
            name
            value
          }
        }
        attributes {
          id
          uuid
          name
          values {
            id
            value
          }
        }
        productsTypes {
          id
          companies_id
          uuid
          name
          description
          slug
          weight
        }
        companies {
          id
          name
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCT_TYPES = gql`
  query {
    productTypes {
      data {
        id
        uuid
        name
        description
        slug
        weight
      }
    }
  }
`;

export const GET_ALL_STATUS = gql`
  query getStatus {
    getStatus {
      data {
        id
        name
      }
    }
  }
`;
