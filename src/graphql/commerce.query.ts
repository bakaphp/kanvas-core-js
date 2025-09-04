import { gql } from "@apollo/client";

export const GET_CART_QUERY = gql`
  query {
    cart {
      id
      total
      total_discount
      discounts {
        code
        amount
        total
      }
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

export const GET_ORDERS = gql`
  query Orders(
    $where: QueryOrdersWhereWhereConditions
    $first: Int
    $page: Int
    $orderBy: [QueryOrdersOrderByOrderByClause!]
    $search: String
  ) {
    orders(
      where: $where
      first: $first
      page: $page
      orderBy: $orderBy
      search: $search
    ) {
      data {
        id
        uuid
        tracking_client_id
        user_email
        user_phone
        token
        billing_address_id
        shipping_address_id
        order_number
        user_id
        total_gross_amount
        total_net_amount
        shipping_price_gross_amount
        shipping_price_net_amount
        discount_amount
        discount_name
        voucher_id
        language_code
        status
        fulfillment_status
        shipping_method_name
        shipping_method_id
        display_gross_prices
        translated_discount_name
        customer_note
        weight
        checkout_token
        currency
        metadata
        private_metadata
        is_deleted
        created_at
        updated_at
        items {
          id
          uuid
          product_name
          product_sku
          quantity
          unit_price_net_amount
          unit_price_gross_amount
          is_shipping_required
          quantity_fulfilled
          tax_rate
          translated_product_name
          currency
          translated_variant_name
          variant_name
          is_deleted
          created_at
          updated_at
        }
      }
      paginatorInfo {
        count
        currentPage
        lastPage
        perPage
        total
      }
    }
  }
`;