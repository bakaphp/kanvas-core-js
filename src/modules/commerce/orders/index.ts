import { ClientType } from '../../../index';
import {
  CREATE_ORDER_FROM_APPLE_IN_APP_PURCHASE,
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
  OrderFromAppleInAppPurchaseResults,
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

  public async generatePaymentIntent(
    id: string
  ): Promise<GeneratePaymentIntentResult> {
    const response = await this.client.mutate({
      mutation: GENERATE_ORDER_PAYMENT_INTENT_MUTATION,
      variables: { id },
    });

    return response.data
      .generateOrderPaymentIntent as GeneratePaymentIntentResult;
  }
}
