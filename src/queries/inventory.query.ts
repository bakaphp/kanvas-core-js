import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query(
    $first: Int
    $page: Int
    $whereCondition: QueryProductsWhereWhereConditions
    $orderByCondition: [QueryProductsOrderByOrderByClause!]
    $hasCategoriesCondition: QueryProductsHasCategoriesWhereHasConditions
    $hasAttributesCondition: QueryProductsHasAttributesWhereHasConditions
  ) {
    products(
      first: $first
      page: $page
      where: $whereCondition
      orderBy: $orderByCondition
      hasCategories: $hasCategoriesCondition
      hasAttributes: $hasAttributesCondition
    ) {
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
          data {
            id
            uuid
            name
            url
            size
            field_name
            type
            attributes
          }
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
            status_history {
              id
              name
              from_date
            }
            channels {
              name
              price
              is_published
            }
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
          name
          value
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
          user {
            firstname
            lastname
            displayname
          }
        }
      }
      paginatorInfo {
        currentPage
        perPage
        firstItem
        lastItem
        total
        count
        lastPage
        hasMorePages
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

export const GET_WAREHOUSES = gql`
  query getWarehouses($whereCondition: QueryGetWarehousesWhereWhereConditions) {
    getWarehouses(where: $whereCondition) {
      data {
        name
        id
        uuid
        location
        is_default
        regions {
          id
          name
        }
      }
    }
  }
`;

export const GET_ATTRIBUTES = gql`
  query getAttributes($whereCondition: QueryAttributesWhereWhereConditions) {
    attributes(where: $whereCondition) {
      data {
        id
        name
        values {
          id
          value
        }
      }
    }
  }
`;
