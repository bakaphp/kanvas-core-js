// Cart Types
export interface CartItemInput {
  quantity: number;
  variant_id: number | string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  attributes: Record<string, string>;
}

export interface CartDiscount {
  code: string;
  amount: string;
  total: number | null;
}

export interface Cart {
  id: string;
  total: number;
  total_discount: number;
  items: CartItem[];
  discounts: CartDiscount[];
}

export interface CartResponse {
  cart: Cart;
}

export interface AddToCartResponse {
  addToCart: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export interface CartDiscountUpdateResponse {
  cartDiscountCodesUpdate: Cart;
}

export interface ClearCartResponse {
  clearCart: boolean;
}

// Order Types
export interface OrderItem {
  id: number;
  uuid: string;
  product_name: string;
  variant_name: string;
  product_sku: string;
  quantity: number;
  unit_price_gross_amount: number;
  unit_price_net_amount?: number;
  is_shipping_required?: boolean;
  quantity_fulfilled?: number;
  tax_rate?: number;
  translated_product_name?: string;
  currency?: string;
  translated_variant_name?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at?: string;
}

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
  user_id?: number;
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
  metadata?: string;
  private_metadata?: string;
  is_deleted: boolean;
  created_at: string;
  updated_at?: string;
  items: OrderItem[];
}

export interface OrderPaymentInput {
  name: string;
  number: string;
  exp_month: number;
  exp_year: number;
  cvv: number;
}

export interface OrderInput {
  cartId: string;
  payment: OrderPaymentInput;
}

export interface OrderCustomerInput {
  email: string;
  phone?: string;
  note?: string;
}

export interface OrderBillingInput {
  address: string;
  address2?: string | null;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface OrderCartInput {
  cartId: string;
  customer: OrderCustomerInput;
  billing?: OrderBillingInput;
  metadata?: any;
}

export interface CreateOrderResponse {
  createOrder: {
    transaction_id: string;
    response_code: string | number;
    message_code: string;
    auth_code: string;
    description: string;
  };
}

export interface OrderFromCartResponse {
  createOrderFromCart: {
    order: Order;
    message: any;
  };
}

export interface AppleInAppPurchaseReceiptInput {
  product_id: string;
  transaction_id: string;
  receipt: string;
  transaction_date: string;
  region_id?: number;
  custom_fields?: Array<{ name: string; data: any }>;
}

export interface GooglePlayInAppPurchaseReceiptInput {
  product_id: string;
  order_id: string;
  purchase_token: string;
  region_id?: number;
  custom_fields?: Array<{ name: string; data: any }>;
}

export interface CreateOrderFromAppleResponse {
  createOrderFromAppleInAppPurchase: Order;
}

export interface CreateOrderFromGoogleResponse {
  createOrderFromGooglePlayInAppPurchase: Order;
}

export interface GeneratePaymentIntentInput {
  amount: number;
}

export interface GeneratePaymentIntentResponse {
  generateOrderPaymentIntent: {
    id: string;
    client_secret: string;
    status?: string;
    message?: any;
  };
}

export interface GetOrdersInput {
  first?: number;
  page?: number;
  where?: WhereCondition;
  orderBy?: OrderBy[];
  search?: string;
}

export interface GetOrdersResponse {
  orders: {
    data: Order[];
    paginatorInfo: {
      count: number;
      currentPage: number;
      lastPage: number;
      perPage: number;
      total: number;
    };
  };
}

export interface WhereCondition {
  column: string;
  operator: string;
  value: any;
  AND?: WhereCondition[];
  OR?: WhereCondition[];
}

export interface OrderBy {
  column: string;
  order: "ASC" | "DESC";
}
