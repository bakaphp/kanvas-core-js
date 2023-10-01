export interface CartItemInput {
  input: {
    quantity: number;
    variant_id: number;
  }[];
}

export interface CartItemData {
  data: {
    addToCart: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[];
  };
}

export interface OrderItemInput {
  input: {
    cartId: 'default';
    payment: {
      name: string;
      number: string;
      exp_month: number;
      exp_year: number;
      cvv: number;
    };
  };
}

export interface OrderItemData {
  data: {
    createOrder: {
      transaction_id: string;
      response_code: string | number;
      message_code: string;
      auth_code: string;
      description: string;
    };
  };
}
