import { gql } from '@apollo/client/core';

export const GET_CHANNEL_PRODUCTS = gql`
  query GetChannelProducts(
    $id: String!
    $first: Int!
    $whereCondition: QueryChannelProductsWhereWhereConditions
    $page: Int
  ) {
    channelProducts(
      id: $id
      first: $first
      where: $whereCondition
      page: $page
    ) {
      data {
        id
        uuid
        name
        slug
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
        files {
          data {
            name
            url
          }
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
