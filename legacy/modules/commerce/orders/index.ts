import { ClientType, GET_ORDERS, OrderBy, WhereCondition } from '../../../__index';
import {
  CREATE_ORDER_FROM_APPLE_IN_APP_PURCHASE,
  CREATE_ORDER_FROM_GOOGLE_PLAY_IN_APP_PURCHASE,
  CREATE_ORDER_FROM_CART,
  CREATE_ORDER_MUTATION,
  GENERATE_ORDER_PAYMENT_INTENT_MUTATION,
} from '../../../mutations';
import {
  OrderItemData,
  OrderItemInput,
  GeneratePaymentIntentResult,
  OrderCartInput,
  OrderFromCartResults,
  AppleInAppPurchaseReceipt,
  GooglePlayInAppPurchaseReceipt,
  OrderFromAppleInAppPurchaseResults,
  OrderFromGooglePlayInAppPurchaseResults,
  CreatedOrders,
} from '../../../types/commerce';

export class Order {
  constructor(protected client: ClientType) { }

  public async createOrder(input: OrderItemInput): Promise<OrderItemData> {
    const response = await this.client.mutate({
      mutation: CREATE_ORDER_MUTATION,
      variables: { input },
    });

    return response.data;
  }

  public async createOrderFromCart(
    input: OrderCartInput
  ): Promise<OrderFromCartResults> {
    const response = await this.client.mutate({
      mutation: CREATE_ORDER_FROM_CART,
      variables: { ...input },
    });

    return response.data;
  }

  public async createOrderFromAppleInAppPurchaseReceipt(
    input: AppleInAppPurchaseReceipt
  ): Promise<OrderFromAppleInAppPurchaseResults> {
    const response = await this.client.mutate({
      mutation: CREATE_ORDER_FROM_APPLE_IN_APP_PURCHASE,
      variables: { ...input },
    });

    return response.data;
  }

  public async createOrderFromGooglePlayInAppPurchaseReceipt(
    input: GooglePlayInAppPurchaseReceipt
  ): Promise<OrderFromGooglePlayInAppPurchaseResults> {
    const response = await this.client.mutate({
      mutation: CREATE_ORDER_FROM_GOOGLE_PLAY_IN_APP_PURCHASE,
      variables: { ...input },
    });

    return response.data;
  }

  public async generatePaymentIntent(
    amount: number
  ): Promise<GeneratePaymentIntentResult> {
    const response = await this.client.mutate({
      mutation: GENERATE_ORDER_PAYMENT_INTENT_MUTATION,
      variables: { amount },
    });

    return response.data
      .generateOrderPaymentIntent as GeneratePaymentIntentResult;
  }

  public async getOrders(
    options: {
      first?: number;
      page?: number;
      where?: WhereCondition;
      orderBy?: OrderBy[];
      search?: string;
    } = {}
  ): Promise<CreatedOrders> {
    const { first, page, where, orderBy, search } = options;

    const response = await this.client.query({
      query: GET_ORDERS,
      variables: { where, first, page, orderBy, search },
      fetchPolicy: 'no-cache',
      partialRefetch: true,
    });
    return response.data;
  }
  
}
