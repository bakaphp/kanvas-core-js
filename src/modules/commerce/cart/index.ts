import { ClientType } from '../../../index';
import {
  ADD_TO_CART_MUTATION,
  CLEAR_CART_MUTATION,
  GET_CART_QUERY,
  CART_DISCOUNT_CODES_UPDATE
} from '../../../mutations';
import { CartData, CartDataDiscount, CartItemData, CartItemInput } from '../../../types/commerce';

export class Cart {
  constructor(protected client: ClientType) { }

  public async addToCart(input: CartItemInput[]): Promise<CartItemData> {
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

  public async getCart(): Promise<CartData> {
    const response = await this.client.query({
      query: GET_CART_QUERY,
      fetchPolicy: 'no-cache',
      partialRefetch: true,
    });

    return response.data;
  }

  public async updateDiscountCodes(discountCodes: string[]): Promise<CartDataDiscount> {
    const response = await this.client.mutate({
      mutation: CART_DISCOUNT_CODES_UPDATE,
      variables: { discountCodes },
    });
  
    return response.data;
  }
}