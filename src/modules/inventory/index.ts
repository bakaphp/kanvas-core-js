import { ClientType } from './../../index';
import {
  GET_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_REGIONS,
  GET_STATUS,
} from '../../queries/inventory.query';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  UPDATE_VARIANT,
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

  public async getProduct(
    first?: number,
    page?: number,
    whereCondition?: WhereCondition
  ): Promise<CreatedProduct> {
    const response = await this.client.query({
      query: GET_PRODUCTS,
      variables: { first, page, whereCondition },
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
    whereCondition?: WhereCondition
  ): Promise<CreatedStatus> {
    const response = await this.client.query({
      query: GET_STATUS,
      variables: { whereCondition },
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
}
