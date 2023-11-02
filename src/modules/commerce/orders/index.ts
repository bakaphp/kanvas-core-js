import { ClientType } from '../../../index';
import { CREATE_ORDER_MUTATION } from '../../../mutations';
import { OrderItemData, OrderItemInput } from '../../../types/commerce';

export class Order {
  constructor(protected client: ClientType) {}

  public async createOrder(input: OrderItemInput): Promise<OrderItemData> {
    const response = await this.client.mutate({
      mutation: CREATE_ORDER_MUTATION,
      variables: { input },
    });

    return response.data;
  }
}
