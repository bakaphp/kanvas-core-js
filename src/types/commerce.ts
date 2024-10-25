export interface CartItemInput {
  quantity: number;
  variant_id: number;
}

export interface CartItemData {
  addToCart: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export interface CartData {
  cart: {
    id: number;
    total: number;
    items: {
      id: number;
      name: string;
      price: number;
      quantity: number;
      attributes: string;
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
