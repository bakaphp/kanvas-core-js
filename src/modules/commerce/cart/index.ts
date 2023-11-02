import { ClientType } from '../../../index';
import { ADD_TO_CART_MUTATION, CLEAR_CART_MUTATION } from '../../../mutations';
import { CartItemData, CartItemInput } from '../../../types/commerce';

export class Cart {
  constructor(protected client: ClientType) {}

  public async addToCart(input: CartItemInput): Promise<CartItemData> {
    const response = await this.client.mutate({
      mutation: ADD_TO_CART_MUTATION,
      variables: { input },
    });

    return response.data;
  }

  public async clearCart() {
    const response = await this.client.mutate({
      mutation: CLEAR_CART_MUTATION,
    });

    return response.data;
  }
}
