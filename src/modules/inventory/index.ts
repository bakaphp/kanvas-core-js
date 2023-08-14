import { ClientType } from './../../index';
import {
  GET_PRODUCTS,
  GET_PRODUCT_TYPES,
  GET_STATUS,
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

  public async getProduct(
    whereCondition?: WhereCondition
  ): Promise<CreatedProduct> {
    const response = await this.client.query({
      query: GET_PRODUCTS,
      variables: { whereCondition },
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
}
