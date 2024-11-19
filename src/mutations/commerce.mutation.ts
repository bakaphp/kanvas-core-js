import { gql } from '@apollo/client/core';

export const ADD_TO_CART_MUTATION = gql`
  mutation($input: [CartItemInput!]!) {
    addToCart(items: $input) {
      id
      name
      price
      quantity
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation($input: OrderInput!) {
    createOrder(input: $input)
  }
`;

export const CREATE_ORDER_FROM_CART = gql`
  mutation($input: OrderCartInput!) {
    createOrderFromCart(input: $input) {
      order {
        id
        uuid
        user_email
        user_phone
        order_number
        status
        total_gross_amount
        fulfillment_status
        items {
          id
          product_name
          product_sku
          quantity
          unit_price_gross_amount
          variant_name
        }
      }
      message
    }
  }
`;

export const CREATE_ORDER_FROM_APPLE_IN_APP_PURCHASE = gql`
  mutation($input: AppleInAppPurchaseReceipt!) {
    createOrderFromAppleInAppPurchase(input: $input) {
        id
        uuid
        user_email
        user_phone
        order_number
        status
        total_gross_amount
        fulfillment_status
        items {
          id
          product_name
          product_sku
          quantity
          unit_price_gross_amount
          variant_name
        }
      }
  }
`;

export const GENERATE_ORDER_PAYMENT_INTENT_MUTATION = gql`
  mutation($id: ID!) {
    generateOrderPaymentIntent(id: $id) {
      client_secret
      status
      message
    }
  }
`;

export const CLEAR_CART_MUTATION = gql`
  mutation {
    clearCart
  }
`;

export const GET_CART_QUERY = gql`
  query {
    cart {
      id
      total
      items {
        id
        name
        price
        quantity
        attributes
      }
    }
  }
`;
