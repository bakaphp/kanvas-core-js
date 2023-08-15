import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query($whereCondition: QueryProductsWhereWhereConditions) {
    products(where: $whereCondition) {
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
          products_id
          uuid
          name
          slug
          description
          short_description
          html_description
          sku
          ean
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

export const GET_PRODUCT_TYPES = gql`
  query($whereCondition: QueryProductTypesWhereWhereConditions) {
    productTypes(where: $whereCondition) {
      data {
        id
        companies_id
        uuid
        name
        description
        slug
        weight
      }
    }
  }
`;

export const GET_STATUS = gql`
  query getStatus($whereCondition: QueryGetStatusWhereWhereConditions) {
    getStatus(where: $whereCondition) {
      data {
        name
        id
      }
    }
  }
`;

export const GET_REGIONS = gql`
  query getRegions($whereCondition: QueryRegionsWhereWhereConditions) {
    regions(where: $whereCondition) {
      data {
        id
        currency_id
        companies_id
        uuid
        name
        settings
        slug
        short_slug
        is_default
      }
    }
  }
`;
