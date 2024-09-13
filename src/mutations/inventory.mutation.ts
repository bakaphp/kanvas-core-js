import { gql } from '@apollo/client/core';

export const CREATE_PRODUCT = gql`
  mutation($input: ProductInput!) {
    createProduct(input: $input) {
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
        user_interactions
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
  }
`;

export const DELETE_PRODUCT = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation($input: ProductInputUpdate, $id: ID!) {
    updateProduct(id: $id, input: $input) {
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
      status {
        id
        name
      }
      variants {
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
        }
        channels {
            name
            warehouses_id
            discounted_price
            price
            channels_id
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
        }
      }
      attributes {
        name
        value
        id
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
          name
          id
          values {
            value
            id
          }
        }
      }
      companies {
        id
        branches {
          id
          uuid
        }
      }
    }
  }
`;

export const UPDATE_VARIANT = gql`
  mutation($id: ID!, $input: VariantsUpdateInput!) {
    updateVariant(id: $id, input: $input) {
      channels {
        name
        price
      }
      description
      ean
      files {
        data {
          name
          url
          type
          uuid
        }
      }
      channels {
        name
        warehouses_id
        price
        discounted_price
        channels_id
      }
      html_description
      id
      name
      sku
      uuid
      warehouses {
        price
        warehouseinfo {
          total_products
          location
          id
          name
        }
        quantity
      }
      product {
        description
        id
        name
        uuid
        variants {
          name
          uuid
          files {
            data {
              name
              url
            }
          }
        }
        productsTypes {
          variants_attributes {
            id
            name
            values {
              id
              value
            }
          }
        }
        files {
          data {
            name
            url
          }
        }
      }
      status {
        id
        name
      }
      user_interactions
      attributes {
        name
        id
        value
      }
      products_id
      status {
        id
        name
      }
      companies {
        branches {
          uuid
          name
        }
      }
      user_interactions
      attributes {
        name
        id
        value
      }
      products_id
      status {
        id
        name
      }
      companies {
        branches {
          uuid
          name
        }
      }
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
        warehouses_id
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
export const CHANNEL_IN_VARIANT = gql`
  mutation(
    $variants_id: ID!
    $channels_id: ID!
    $warehouses_id: ID!
    $input: VariantChannelInput!
  ) {
    updateVariantInChannel(
      variants_id: $variants_id
      channels_id: $channels_id
      warehouses_id: $warehouses_id
      input: $input
    ) {
      id
      name
    }
  }
`;
export const CREATE_STATUS = gql`
  mutation createStatus($input: StatusInput!) {
    createStatus(input: $input) {
      id
      name
    }
  }
`;

export const DELETE_VARIANT = gql`
  mutation($id: ID!) {
    deleteVariant(id: $id)
  }
`;

export const CREATE_CATEGORIES = gql`
  mutation CreateRegion($input: CategoryInput!) {
    createCategory(input: $input) {
      name
      id
    }
  }
`;

export const UPDATE_CATEGORIES = gql`
  mutation($input: CategoryUpdateInput!, $id: ID!) {
    updateCategory(id: $id, input: $input) {
      total_products
      weight
      slug
      position
      name
      is_published
      id
      uuid
      companies {
        name
        id
      }
    }
  }
`;

export const DELETE_CATEGORIES = gql`
  mutation delete($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const CREATE_PRODUCT_TYPE = gql`
  mutation createProductType($input: ProductTypeInput!) {
    createProductType(input: $input) {
      name
    }
  }
`;

export const UPDATE_PRODUCT_TYPE = gql`
  mutation($input: ProductTypeUpdateInput!, $id: ID!) {
    updateProductType(id: $id, input: $input) {
      companies {
        name
      }
      name
      is_published
      description
      id
      total_products
      weight
      uuid
      products_attributes {
        name
        id
      }
      variants_attributes {
        name
        id
      }
    }
  }
`;

export const DELETE_PRODUCT_TYPE = gql`
  mutation delete($id: ID!) {
    deleteProductType(id: $id)
  }
`;

export const UPDATE_STATUS = gql`
  mutation($input: StatusInput!, $id: ID!) {
    updateStatus(id: $id, input: $input) {
      id
      name
      is_default
      is_published
      slug
    }
  }
`;

export const DELETE_STATUS = gql`
  mutation delete($id: ID!) {
    deleteStatus(id: $id)
  }
`;

export const CREATE_REGION = gql`
  mutation CreateRegion($input: RegionInput!) {
    createRegion(input: $input) {
      name
      id
    }
  }
`;

export const UPDATE_REGION = gql`
  mutation($input: RegionInputUpdate!, $id: ID!) {
    updateRegion(id: $id, input: $input) {
      id
      name
      uuid
      is_default
      currencies {
        currency
      }
      companies {
        name
      }
    }
  }
`;

export const DELETE_REGION = gql`
  mutation delete($id: ID!) {
    deleteRegion(id: $id)
  }
`;

export const CREATE_WAREHOUSE = gql`
  mutation createWarehouse($input: WarehouseInput!) {
    createWarehouse(input: $input) {
      id
      name
      is_default
    }
  }
`;

export const UPDATE_WAREHOUSE = gql`
  mutation updateWarehouse($input: WarehouseInputUpdate!, $id: ID!) {
    updateWarehouse(input: $input, id: $id) {
      name
      id
      is_default
      location
      regions_id
      uuid
      total_products
      company {
        id
        name
      }
      regions {
        name
      }
    }
  }
`;

export const DELETE_WAREHOUSE = gql`
  mutation delete($id: ID!) {
    deleteWarehouse(id: $id)
  }
`;

export const CREATE_CHANNELS = gql`
  mutation($input: CreateChannelInput!) {
    createChannel(input: $input) {
      name
      id
      uuid
      slug
    }
  }
`;

export const UPDATE_CHANNELS = gql`
  mutation($input: UpdateChannelInput!, $id: ID!) {
    updateChannel(input: $input, id: $id) {
      id
      name
      slug
      companies {
        name
        id
      }
      is_default
      is_published
      uuid
    }
  }
`;

export const DELETE_CHANNELS = gql`
  mutation($id: ID!) {
    deleteChannel(id: $id)
  }
`;

export const CREATE_VARIANT = gql`
  mutation($input: VariantsInput!) {
    createVariant(input: $input) {
      id
      uuid
      products_id
      name
      attributes {
        name
        value
      }
      status {
        id
        name
      }
      warehouses {
        status {
          id
          name
        }
        warehouses_id
        warehouseinfo {
          id
          name
          total_products
        }
        quantity
        price
        status_history {
          name
          id
        }
      }
    }
  }
`;

export const DELETE_ATTRIBUTES = gql`
  mutation($id: ID!) {
    deleteAttribute(id: $id)
  }
`;

export const CREATE_ATTRIBUTES = gql`
  mutation($input: AttributeInput!) {
    createAttribute(input: $input) {
      name
      values {
        value
      }
    }
  }
`;

export const UPDATE_ATTRIBUTES = gql`
  mutation($id: ID!, $input: AttributeUpdateInput!) {
    updateAttribute(id: $id, input: $input) {
      id
      is_filtrable
      is_searchable
      is_visible
      name
      uuid
      slug
      values {
        id
        value
      }
      attribute_type {
        name
        id
        slug
      }
      created_at
    }
  }
`;
