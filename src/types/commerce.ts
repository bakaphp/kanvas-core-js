import { CompanyInterface } from "./companies";
import { CustomFieldInput } from "./custom-fields";
import { PaginatorInfo } from "./paginator";
import { PeopleInterface } from "./people";
import { UserInterface } from "./users";

export interface Order {
  id: number;
  uuid: string;
  tracking_client_id?: string;
  user_email: string;
  user_phone: string;
  token?: string;
  billing_address_id?: number;
  shipping_address_id?: number;
  order_number: number;
  user_id?: number; // Deprecated
  user: UserInterface;
  people: PeopleInterface;
  company: CompanyInterface;
  total_gross_amount: number;
  total_net_amount?: number;
  shipping_price_gross_amount?: number;
  shipping_price_net_amount?: number;
  discount_amount?: number;
  discount_name?: string;
  voucher_id?: number;
  language_code?: string;
  status: string;
  fulfillment_status: string;
  shipping_method_name?: string;
  shipping_method_id?: number;
  display_gross_prices?: boolean;
  translated_discount_name?: string;
  customer_note?: string;
  weight?: number;
  checkout_token?: string;
  currency: string;
  metadata: string;
  private_metadata?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at?: string;
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
    custom_fields?: CustomFieldInput[];
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
export interface CreatedOrders {
  orders: {
    data: Order[];
    paginatorInfo?: PaginatorInfo;
  };
}
