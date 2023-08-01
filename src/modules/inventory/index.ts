import { ClientType } from './../../index';
import { GET_ALL_PRODUCTS, GET_ALL_PRODUCT_TYPES } from '../../queries/inventory.query';
import { CREATE_PRODUCT } from '../../mutations';
import {
  CreateProductParams,
  CreatedProduct,
  CreatedProductTypes,
  ProductInterface,
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

  public async getAllProduct(): Promise<CreatedProduct> {
    const response = await this.client.query({
      query: GET_ALL_PRODUCTS,
    });

    return response.data;
  }
  public async getAllProductTypes(): Promise<CreatedProductTypes> {
    const response = await this.client.query({
      query: GET_ALL_PRODUCT_TYPES,
    });

    return response.data;
  }
}
