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
  CREATE_CATEGORIES,
  DELETE_CATEGORIES,
  DELETE_PRODUCT,
  DELETE_VARIANT,
  UPDATE_CATEGORIES,
  UPDATE_PRODUCT,
  UPDATE_VARIANT,
  UPDATE_VARIANT_IN_WAREHOUSE,
  CREATE_PRODUCT_TYPE,
  UPDATE_PRODUCT_TYPE,
  DELETE_PRODUCT_TYPE,
  UPDATE_STATUS,
  DELETE_STATUS,
  UPDATE_WAREHOUSE,
  DELETE_WAREHOUSE,
  CREATE_WAREHOUSE,
  UPDATE_REGION,
  CREATE_REGION,
  DELETE_REGION,
  UPDATE_CHANNELS,
  CREATE_CHANNELS,
  DELETE_CHANNELS,
  CREATE_VARIANT,
  DELETE_ATTRIBUTES,
  CREATE_ATTRIBUTES,
  UPDATE_ATTRIBUTES
} from '../../mutations';
import {
  CreateProductParams,
  CreatedProduct,
  CreatedProductTypes,
  CreatedStatus,
  CreatedRegions,
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
  CreateStatus,
  DeleteCategories,
  UpdatedCategory,
  InputCategoriesParams,
  InputProductTypeParams,
  DeleteProductType,
  UpdatedProductType,
  DeleteStatus,
  InputUpdateStatusParams,
  UpdatedStatus,
  InputWarehouseParams,
  DeleteWarehouse,
  CreatedWarehouse,
  UpdatedWarehouse,
  DeleteRegion,
  UpdatedRegion,
  InputRegionParams,
  CreatedRegion,
  DeleteChannels,
  CreatedChannels,
  UpdatedChannels,
  InputChannelsParams,
  CreatedVariant,
  InputChannelVariantParams,
  InputAttributesParams,
  DeleteAttribute,
  UpdatedAttributes,
} from '../../types';

export class Inventory {
  constructor(protected client: ClientType) { }

  public async createProduct(
    data: ProductInterface | CreateProductParams
  ): Promise<CreatedProduct> {
    const response = await this.client.mutate({
      mutation: CREATE_PRODUCT,
      variables: { input: data },
    });
    return response.data;
  }

  public async createStatus(data: InputStatusParams): Promise<CreateStatus> {
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
      hasVariantsCondition?: WhereCondition;
      search?: string;
      translate?: string;
      withTranslate?: boolean;
    } = {}
  ): Promise<AllCreatedProducts> {
    const {
      first,
      page,
      whereCondition,
      orderByCondition,
      hasCategoriesCondition,
      hasAttributesCondition,
      hasVariantsCondition, 
      search,
      translate,
      withTranslate,
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
        hasVariantsCondition,
        search,
        withTranslate,
        translate,
      },
      fetchPolicy: 'no-cache',
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

  public async deleteStatus(id: number): Promise<DeleteStatus> {
    const response = await this.client.mutate({
      mutation: DELETE_STATUS,
      variables: { id: id },
    });

    return response.data;
  }

  public async getRegions(
    whereCondition?: WhereCondition
  ): Promise<CreatedRegions> {
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

  public async updateChannelInVariant({
    variants_id,
    channels_id,
    warehouses_id,
    input,
  }: InputChannelVariantParams): Promise<UpdatedVariantWarehouse> {
    const response = await this.client.mutate({
      mutation: UPDATE_VARIANT_IN_WAREHOUSE,
      variables: { variants_id: variants_id, channels_id: channels_id, warehouses_id: warehouses_id, input: input },
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
      fetchPolicy: 'no-cache',
      partialRefetch: true,
    });

    return response.data;
  }

  public async updateStatus({
    id,
    input,
  }: InputUpdateStatusParams): Promise<UpdatedStatus> {
    const response = await this.client.mutate({
      mutation: UPDATE_STATUS,
      variables: { id: id, input: input },
    });
    return response.data;
  }

  public async productAdminDashboard(): Promise<
    ProductAdminDashboardInterface
  > {
    const response = await this.client.query({
      query: PRODUCT_ADMIN_DASHBOARD,
      fetchPolicy: 'no-cache',
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
      translations?: string;
      withTranslate?: boolean;
    } = {}
  ): Promise<AllCreatedVariants> {
    const { first, page, whereCondition, orderByCondition, search, translations, withTranslate } = options;

    const response = await this.client.query({
      query: GET_VARIANTS,

      variables: {
        first,
        page,
        whereCondition,
        orderByCondition,
        search,
        translations,
        withTranslate,
      },
      fetchPolicy: 'no-cache',
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
      fetchPolicy: 'no-cache',
      partialRefetch: true,
    });

    return response.data;
  }

  public async updateCategory({
    id,
    input,
  }: InputCategoriesParams): Promise<UpdatedCategory> {
    const response = await this.client.mutate({
      mutation: UPDATE_CATEGORIES,
      variables: { id: id, input: input },
    });
    return response.data;
  }

  public async createCategory(data: InputCategoriesParams): Promise<CreateStatus> {
    const response = await this.client.mutate({
      mutation: CREATE_CATEGORIES,
      variables: {
        input: data,
      },
    });
    return response.data;
  }

  public async deleteCategory(id: number | string): Promise<DeleteCategories> {
    const response = await this.client.mutate({
      mutation: DELETE_CATEGORIES,
      variables: { id: id },
    });

    return response.data;
  }

  public async updateProductType({
    id,
    input,
  }: InputProductTypeParams): Promise<UpdatedProductType> {
    const response = await this.client.mutate({
      mutation: UPDATE_PRODUCT_TYPE,
      variables: { id: id, input: input },
    });
    return response.data;
  }

  public async createProductType(data: InputProductTypeParams): Promise<CreatedProductTypes> {
    const response = await this.client.mutate({
      mutation: CREATE_PRODUCT_TYPE,
      variables: {
        input: data,
      },
    });
    return response.data;
  }

  public async deleteProductType(id: number | string): Promise<DeleteProductType> {
    const response = await this.client.mutate({
      mutation: DELETE_PRODUCT_TYPE,
      variables: { id: id },
    });

    return response.data;
  }

  public async updateWarehouse({
    id,
    input,
  }: InputWarehouseParams): Promise<UpdatedWarehouse> {
    const response = await this.client.mutate({
      mutation: UPDATE_WAREHOUSE,
      variables: { id: id, input: input },
    });
    return response.data;
  }

  public async createWarehouse(data: InputWarehouseParams): Promise<CreatedWarehouse> {
    const response = await this.client.mutate({
      mutation: CREATE_WAREHOUSE,
      variables: {
        input: data,
      },
    });
    return response.data;
  }

  public async deleteWarehouse(id: number | string): Promise<DeleteWarehouse> {
    const response = await this.client.mutate({
      mutation: DELETE_WAREHOUSE,
      variables: { id: id },
    });

    return response.data;
  }

  public async updateRegion({
    id,
    input,
  }: InputRegionParams): Promise<UpdatedRegion> {
    const response = await this.client.mutate({
      mutation: UPDATE_REGION,
      variables: { id: id, input: input },
    });
    return response.data;
  }

  public async createRegion(data: InputRegionParams): Promise<CreatedRegion> {
    const response = await this.client.mutate({
      mutation: CREATE_REGION,
      variables: {
        input: data,
      },
    });
    return response.data;
  }

  public async deleteRegion(id: number | string): Promise<DeleteRegion> {
    const response = await this.client.mutate({
      mutation: DELETE_REGION,
      variables: { id: id },
    });

    return response.data;
  }

  public async updateChannels({
    id,
    input,
  }: InputChannelsParams): Promise<UpdatedChannels> {
    const response = await this.client.mutate({
      mutation: UPDATE_CHANNELS,
      variables: { id: id, input: input },
    });
    return response.data as UpdatedChannels;
  }

  public async createChannels(data: InputChannelsParams): Promise<CreatedChannels> {
    const response = await this.client.mutate({
      mutation: CREATE_CHANNELS,
      variables: {
        input: data,
      },
    });
    return response.data as CreatedChannels;
  }

  public async deleteChannels(id: number | string): Promise<DeleteChannels> {
    const response = await this.client.mutate({
      mutation: DELETE_CHANNELS,
      variables: { id: id },
    });

    return response.data as DeleteChannels;
  }

  public async createVariant(data: InputVariantParams): Promise<CreatedVariant> {
    const response = await this.client.mutate({
      mutation: CREATE_VARIANT,
      variables: {
        input: data,
      },
    });
    return response.data;
  }

  public async updateAttribute({
    id,
    input,
  }: InputAttributesParams): Promise<UpdatedAttributes> {
    const response = await this.client.mutate({
      mutation: UPDATE_ATTRIBUTES,
      variables: {
        input: input,
        id: id
      },
    });
    return response.data;
  }

  public async deleteAttribute(id: number | string): Promise<DeleteAttribute> {
    const response = await this.client.mutate({
      mutation: DELETE_ATTRIBUTES,
      variables: { id: id },
    });

    return response.data;
  }

  public async createAttribute(data: InputAttributesParams): Promise<CreatedAttributes> {
    const response = await this.client.mutate({
      mutation: CREATE_ATTRIBUTES,
      variables: {
        input: data,
      },
    });
    return response.data;
  }
}
