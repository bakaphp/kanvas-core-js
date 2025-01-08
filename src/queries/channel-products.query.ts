import { gql } from '@apollo/client/core';

export const GET_CHANNEL_PRODUCTS = gql`
  query GetChannelProducts($id: String!, $first: Int!, $whereCondition: QueryChannelProductsWhereWhereConditions) {
    channelProducts(id: $id, first: $first, where: $whereCondition) {
      data {
        id
        uuid
        name
        description
        variants {
          id
          name
          channel {
            price
          }
        }
        attributes {
          slug
          name
          value
        }
      }
    }
  }
`;
