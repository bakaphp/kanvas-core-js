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

export const CLEAR_CART_MUTATION = gql`
  mutation {
    clearCart
  }
`;
