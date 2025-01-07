import { gql } from '@apollo/client/core';

export const GET_CHANNEL_PRODUCTS = gql`
  query GetChannelProducts($id: String!) {
    channelProducts(id: $id) {
      data {
        id
        name
        description
        variants {
          id
          name
          channel {
            price
          }
        }
      }
    }
  }
`;
