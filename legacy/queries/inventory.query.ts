import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query(
    $first: Int
    $page: Int
    $whereCondition: QueryProductsWhereWhereConditions
    $orderByCondition: [QueryProductsOrderByOrderByClause!]
    $hasCategoriesCondition: QueryProductsHasCategoriesWhereHasConditions
    $hasAttributesCondition: QueryProductsHasAttributesWhereHasConditions
    $hasVariantsCondition: QueryProductsHasVariantsWhereHasConditions
    $search: String
    $withTranslate: Boolean! = false
    $translate: String! = "en"
  ) {
    products(
      first: $first
      page: $page
      where: $whereCondition
      orderBy: $orderByCondition
      hasCategories: $hasCategoriesCondition
      hasAttributes: $hasAttributesCondition
      hasVariants: $hasVariantsCondition
      search: $search
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
        translation(languageCode: $translate) @include(if: $withTranslate) {
          name
          description
          html_description
          language {
            code
          }
        }
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
          metadata
          user_interactions
          description
          short_description
          html_description
          sku
          ean
          channel {
            price
            quantity
          }
          status {
            id
            name
          }
          warehouses {
            warehouses_id
            status_history {
              id
              name
              from_date
            }
            channels {
              name
              warehouses_id
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
            slug
            value
          }
        }
        attributes {
          name
          slug
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
          products_attributes {
            id
            name
            values {
              id
              value
            }
          }
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
  query getStatus(
    $first: Int
    $page: Int
    $whereCondition: [QueryStatusWhereWhereConditions!]
    $orderByCondition: [QueryStatusOrderByOrderByClause!]
  ) {
    status(
      first: $first
      page: $page
      where: { AND: $whereCondition }
      orderBy: $orderByCondition
    ) {
      data {
        name
        id
        is_default
        slug
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
  query getWarehouses($whereCondition: QueryWarehousesWhereWhereConditions) {
    warehouses(where: $whereCondition) {
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

export const PRODUCT_DASHBOARD = gql`
  query getproductDashboard {
    productDashboard {
      total_products
      total_variants
      product_status {
        status_id
        status_name
        warehouses_name
        warehouses_id
        total_amount
      }
    }
  }
`;

export const PRODUCT_ADMIN_DASHBOARD = gql`
  query getProductAdminDashboard {
    productAdminDashboard {
      total_products
      total_variants
      product_status {
        status_id
        status_name
        status_slug
        status_companies_id
        total_amount
      }
    }
  }
`;

export const GET_VARIANTS = gql`
  query getVariants(
    $first: Int
    $page: Int
    $whereCondition: QueryVariantsWhereWhereConditions
    $orderByCondition: [QueryVariantsOrderByOrderByClause!]
    $search: String
    $withTranslate: Boolean! = false
    $translate: String! = "en"
  ) {
    variants(
      first: $first
      page: $page
      where: $whereCondition
      orderBy: $orderByCondition
      search: $search
    ) {
      data {
        id
        products_id
        uuid
        name
        slug
        user_interactions
        description
        short_description
        html_description
        sku
        ean
        translation(languageCode: $translate) @include(if: $withTranslate) {
          name
          description
          html_description
          language {
            code
          }
        }
        status {
          id
          name
          slug
        }
        channel {
            price
            quantity
        }
        warehouses {
          warehouses_id
          status_history {
            id
            name
            from_date
          }
          channels {
            name
            warehouses_id
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
          slug
        }
        product {
          id
          slug
          name
          description
          created_at
          updated_at
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

export const GET_VARIANTS_BY_STATUS = gql`
  query getVariantsByStatus(
    $warehouse_id: ID!
    $status_id: [ID]!
    $first: Int
    $page: Int
    $whereCondition: QueryVariantsByStatusWhereWhereConditions
    $search: String
    $orderByCondition: [QueryVariantsByStatusOrderByOrderByClause!]
  ) {
    variantsByStatus(
      warehouse_id: $warehouse_id
      status_id: $status_id
      first: $first
      page: $page
      where: $whereCondition
      search: $search
      orderBy: $orderByCondition
    ) {
      data {
        id
        products_id
        uuid
        name
        slug
        user_interactions
        description
        short_description
        html_description
        sku
        ean
        status {
          id
          name
          slug
        }
        channel {
            price
            quantity
        }
        warehouses {
          warehouses_id
          status_history {
            id
            name
            from_date
          }
          channels {
            name
            warehouses_id
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
          slug
        }

        product {
          id
          slug
          name
          description
          created_at
          updated_at
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
