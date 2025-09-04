import {
  CREATE_ORDER_FROM_APPLE_IN_APP_PURCHASE,
  CREATE_ORDER_FROM_CART,
  CREATE_ORDER_FROM_GOOGLE_PLAY_IN_APP_PURCHASE,
  CREATE_ORDER_MUTATION,
  GENERATE_ORDER_PAYMENT_INTENT_MUTATION,
} from "@/graphql/commerce.mutation";

import {
  AppleInAppPurchaseReceiptInput,
  GetOrdersInput,
  GooglePlayInAppPurchaseReceiptInput,
  OrderCartInput,
  OrderInput,
} from "@/types/commerce";

import { GET_ORDERS } from "@/graphql/commerce.query";
import { Client } from "@/types/app";

class Order {
  #client: Client;

  constructor(client: Client) {
    this.#client = client;
  }

  /**
   * Create an order with payment details
   */
  public async createOrder(input: OrderInput) {
    const response = await this.#client.mutate({
      mutation: CREATE_ORDER_MUTATION,
      variables: { input },
    });

    return response;
  }

  /**
   * Create an order from current cart
   */
  public async createOrderFromCart(
    input: OrderCartInput,
  ) {
    const response = await this.#client.mutate({
      mutation: CREATE_ORDER_FROM_CART,
      variables: { input },
    });

    return response;
  }

  /**
   * Create an order from Apple In-App Purchase receipt
   */
  public async createOrderFromAppleInAppPurchase(
    input: AppleInAppPurchaseReceiptInput,
  ) {
    const response = await this.#client.mutate({
      mutation: CREATE_ORDER_FROM_APPLE_IN_APP_PURCHASE,
      variables: { input },
    });

    return response;
  }

  /**
   * Create an order from Google Play In-App Purchase receipt
   */
  public async createOrderFromGooglePlayInAppPurchase(
    input: GooglePlayInAppPurchaseReceiptInput,
  ) {
    const response = await this.#client.mutate({
      mutation: CREATE_ORDER_FROM_GOOGLE_PLAY_IN_APP_PURCHASE,
      variables: { input },
    });

    return response;
  }

  /**
   * Generate a payment intent for Stripe
   */
  public async generatePaymentIntent(
    amount: number,
  ) {
    const response = await this.#client.mutate({
      mutation: GENERATE_ORDER_PAYMENT_INTENT_MUTATION,
      variables: { amount },
    });

    return response;
  }

  /**
   * Get orders with filtering and pagination
   */
  public async getOrders(
    options: GetOrdersInput = {},
  ) {
    const { first, page, where, orderBy, search } = options;

    const response = await this.#client.query({
      query: GET_ORDERS,
      variables: { where, first, page, orderBy, search },
      fetchPolicy: "no-cache",
    });

    return response;
  }
}

/**
 * Create an Order instance
 */
export function createOrder(client: Client) {
  return new Order(client);
}
