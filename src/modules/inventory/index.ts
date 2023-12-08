import { ClientType } from './../../index';
import {
  GET_ATTRIBUTES,
  GET_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_REGIONS,
  GET_STATUS,
  GET_VARIANTS,
  GET_VARIANTS_BY_STATUS,
  GET_WAREHOUSES,
  PRODUCT_ADMIN_DASHBOARD,
  PRODUCT_DASHBOARD,
} from '../../queries/inventory.query';
import {
  CREATE_PRODUCT,
  CREATE_STATUS,
  DELETE_PRODUCT,
  DELETE_VARIANT,
  UPDATE_PRODUCT,
  UPDATE_VARIANT,
  UPDATE_VARIANT_IN_WAREHOUSE,
} from '../../mutations';
import {
  CreateProductParams,
  CreatedProduct,
  CreatedProductTypes,
  CreatedStatus,
  CreatedrRegions,
  DeleteProduct,
  ProductInterface,
  UpdatedVariant,
  InputVariantParams,
  WhereCondition,
  UpdatedProduct,
  InputProductParams,
  InputVariantWarehouseParams,
  UpdatedVariantWarehouse,
  AllCreatedProducts,
  CreatedWarehouses,
  CreatedAttributes,
  OrderBy,
  ProductDashboardInterface,
  AllCreatedVariants,
  deleteVariant,
  AllCreatedVariantsbyStatus,
  InputStatusParams,
  ProductAdminDashboardInterface,
} from '../../types';

export class Inventory {
  constructor(protected client: ClientType) {}

  public async createProduct(
    data: ProductInterface | CreateProductParams
  ): Promise<CreatedProduct> {
    const response = await this.client.mutate({
      mutation: CREATE_PRODUCT,
      variables: { input: data },
    });
    return response.data;
  }

  public async createStatus(data: InputStatusParams): Promise<CreatedStatus> {
    const response = await this.client.mutate({
      mutation: CREATE_STATUS,
      variables: {
        input: data,
      },
    });
    return response.data;
  }

  public async getProduct(
    options: {
      first?: number;
      page?: number;
      whereCondition?: WhereCondition;
      orderByCondition?: OrderBy[];
      hasCategoriesCondition?: WhereCondition;
      hasAttributesCondition?: WhereCondition;
      search?: string;
    } = {}
  ): Promise<AllCreatedProducts> {
    const {
      first,
      page,
      whereCondition,
      orderByCondition,
      hasCategoriesCondition,
      hasAttributesCondition,
      search,
    } = options;

    const response = await this.client.query({
      query: GET_PRODUCTS,

      variables: {
        first,
        page,
        whereCondition,
        orderByCondition,
        hasCategoriesCondition,
        hasAttributesCondition,
        search,
      },
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });

    return response.data;
  }
  public async getProductTypes(
    whereCondition?: WhereCondition
  ): Promise<CreatedProductTypes> {
    const response = await this.client.query({
      query: GET_PRODUCT_TYPES,
      variables: { whereCondition },
    });

    return response.data;
  }

  public async deleteProduct(id: number): Promise<DeleteProduct> {
    const response = await this.client.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id: id },
    });

    return response.data;
  }
  public async getStatus(
    options: {
      first?: number;
      page?: number;
      whereCondition?: WhereCondition;
      orderByCondition?: OrderBy[];
    } = {}
  ): Promise<CreatedStatus> {
    const { first, page, whereCondition, orderByCondition } = options;

    const response = await this.client.query({
      query: GET_STATUS,
      variables: { first, page, whereCondition, orderByCondition },
    });
    return response.data;
  }

  public async getRegions(
    whereCondition?: WhereCondition
  ): Promise<CreatedrRegions> {
    const response = await this.client.query({
      query: GET_REGIONS,
      variables: { whereCondition },
    });
    return response.data;
  }
  public async updateProduct({
    id,
    input,
  }: InputProductParams): Promise<UpdatedProduct> {
    const response = await this.client.mutate({
      mutation: UPDATE_PRODUCT,
      variables: { id: id, input: input },
    });
    return response.data;
  }
  public async updateVariant({
    id,
    input,
  }: InputVariantParams): Promise<UpdatedVariant> {
    const response = await this.client.mutate({
      mutation: UPDATE_VARIANT,
      variables: { id: id, input: input },
    });
    return response.data;
  }

  public async updateVariantWarehouse({
    id,
    input,
  }: InputVariantWarehouseParams): Promise<UpdatedVariantWarehouse> {
    const response = await this.client.mutate({
      mutation: UPDATE_VARIANT_IN_WAREHOUSE,
      variables: { id: id, input: input },
    });
    return response.data;
  }

  public async getWareHouses(
    whereCondition?: WhereCondition
  ): Promise<CreatedWarehouses> {
    const response = await this.client.query({
      query: GET_WAREHOUSES,
      variables: { whereCondition },
    });
    return response.data;
  }

  public async getAttributes(
    whereCondition?: WhereCondition
  ): Promise<CreatedAttributes> {
    const response = await this.client.query({
      query: GET_ATTRIBUTES,
      variables: { whereCondition },
    });
    return response.data;
  }

  public async productDashboard(): Promise<ProductDashboardInterface> {
    const response = await this.client.query({
      query: PRODUCT_DASHBOARD,
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });

    return response.data;
  }
  public async productAdminDashboard(): Promise<
    ProductAdminDashboardInterface
  > {
    const response = await this.client.query({
      query: PRODUCT_ADMIN_DASHBOARD,
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });

    return response.data;
  }

  public async getVariants(
    options: {
      first?: number;
      page?: number;
      whereCondition?: WhereCondition;
      orderByCondition?: OrderBy[];
      search?: string;
    } = {}
  ): Promise<AllCreatedVariants> {
    const { first, page, whereCondition, orderByCondition, search } = options;

    const response = await this.client.query({
      query: GET_VARIANTS,

      variables: {
        first,
        page,
        whereCondition,
        orderByCondition,
        search,
      },
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });

    return response.data;
  }

  public async deleteVariant(id: number | string): Promise<deleteVariant> {
    const response = await this.client.mutate({
      mutation: DELETE_VARIANT,
      variables: { id: id },
    });

    return response.data;
  }

  public async getVariantsByStatus(
    options: {
      warehouse_id: number | string;
      status_id: number | string;
      first?: number;
      page?: number;
      whereCondition?: WhereCondition;
      search?: string;
      orderByCondition?: OrderBy[];
    } = {
      warehouse_id: 0,
      status_id: '',
    }
  ): Promise<AllCreatedVariantsbyStatus> {
    const {
      warehouse_id,
      status_id,
      first,
      page,
      whereCondition,
      search,
      orderByCondition,
    } = options;

    const response = await this.client.query({
      query: GET_VARIANTS_BY_STATUS,

      variables: {
        warehouse_id,
        status_id,
        first,
        page,
        whereCondition,
        search,
        orderByCondition,
      },
      fetchPolicy: 'network-only',
      partialRefetch: true,
    });

    return response.data;
  }
}
