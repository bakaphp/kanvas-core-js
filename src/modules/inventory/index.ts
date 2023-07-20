import { ClientType } from '../../index';
import { CREATE_PRODUCT } from '../../mutations';
import {
  CreateProductParams,
  CreatedProduct,
  ProductInterface,
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
}