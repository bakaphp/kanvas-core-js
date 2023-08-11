import { ClientType } from './../../index';
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_ALL_STATUS,
} from '../../queries/inventory.query';
import { CREATE_PRODUCT, DELETE_PRODUCT } from '../../mutations';
import {
  CreateProductParams,
  CreatedProduct,
  CreatedProductTypes,
  CreatedStatus,
  DeleteProduct,
  ProductInterface,
  WhereCondition,
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

  public async getAllProduct(): Promise<CreatedProduct> {
    const response = await this.client.query({
      query: GET_ALL_PRODUCTS,
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
  public async getAllStatus(): Promise<CreatedStatus> {
    const response = await this.client.query({
      query: GET_ALL_STATUS,
    });
    return response.data;
  }
}
