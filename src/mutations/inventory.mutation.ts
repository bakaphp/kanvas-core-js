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
export const CREATE_STATUS = gql`
  mutation createStatus($input: StatusInput!) {
    createStatus(input: $input) {
      id
      name
      is_default
      slug
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
  mutation($input: CategoryUpdateInput! $id: ID!) {
    updateCategory(
        id: $id
        input:$input
    ){
        name,
        id
    }
}`;

export const DELETE_CATEGORIES = gql`
  mutation delete($id: ID!) {
    deleteCategory(id: $id)
  }`
  ;

export const CREATE_PRODUCT_TYPE= gql`
  mutation createProductType($input: ProductTypeInput!) {
    createProductType(input: $input) {
      name
    }
  }
`;

export const UPDATE_PRODUCT_TYPE = gql`
  mutation($input: ProductTypeUpdateInput! $id: ID!) {
    updateProductType(
        id: $id
        input:$input
    ){
        name,
        id
    }
}`;

export const DELETE_PRODUCT_TYPE = gql`
  mutation delete($id: ID!){
    deleteProductType(id: $id)
  }`
  ;

export const UPDATE_STATUS = gql`
  mutation($input: StatusInput! $id: ID!) {
    updateStatus(
        id: $id
        input: $input
    ){
        name,
        id
    }
}`;

export const DELETE_STATUS = gql`
  mutation delete($id: ID!){
    deleteStatus(id: $id)
  }`
  ;

export const CREATE_REGION = gql`
  mutation CreateRegion($input: RegionInput!) {
    createRegion(input: $input) {
      name
      id
    }
  }
`;

export const UPDATE_REGION = gql`
  mutation($input: RegionInputUpdate! $id: ID!) {
    updateRegion(
        id: $id
        input:$input
    ){
        name,
        id
    }
}`;

export const DELETE_REGION = gql`
  mutation delete($id: ID!){
    deleteRegion(id: $id)
  }`
  ;

export const CREATE_WAREHOUSE = gql`
  mutation createWarehouse($input: WarehouseInput!){
    createWarehouse(input: $input) {
        id,
        name,
        is_default
    }
  }`;

export const UPDATE_WAREHOUSE = gql`
  mutation updateWarehouse($input: WarehouseInputUpdate! $id: ID!) {
    updateWarehouse(input: $input, id:$id){
        name,
        is_default
    }
  }`;

export const DELETE_WAREHOUSE = gql`
  mutation delete($id: ID!){
    deleteWarehouse(id: $id)
  }`;




