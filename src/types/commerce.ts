import { PeopleInterface } from "./people";
import { UserInterface } from "./users";

export interface Order {
  id: number;
  uuid: string;
  user_email: string;
  user_phone: string;
  order_number: string;
  user: UserInterface;
  people: PeopleInterface;
  total_gross_amount: number;
  status: string;
  fulfillment_status: string;
  currency: string;
  metadata: string;
  items: OrderItem[];
}

export interface OrderResult {
  order: Order;
  message: any;
}

export interface OrderFromCartResults {
  createOrderFromCart: OrderResult;
}

export interface OrderFromAppleInAppPurchaseResults {
  createOrderFromAppleInAppPurchase: Order;
}

export interface OrderItem {
  id: number;
  product_name: string;
  variant_name: string;
  product_sku: string;
  quantity: number;
  unit_price_gross_amount: number;
}

export interface CartItemInput {
  quantity: number;
  variant_id: number;
}

export interface AppleInAppPurchaseReceipt {
  input: {
    product_id: string;
    transaction_id: string;
    receipt: string;
    transaction_date: string;
    region_id?: number;
  };
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

export interface OrderCartInput {
  input: {
    cartId: 'default';
    customer: {
      email: string;
      phone?: string;
      note?: string;
    };
    billing?: {
      address: string;
      address2: string | null;
      city: string;
      state: string;
      country: string;
      postal_code: string;
    };
    metadata?: any;
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

export interface GeneratePaymentIntentResult {
  client_secret: string;
  status?: string;
  message?: any;
}
