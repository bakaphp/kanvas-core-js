import { gql } from '@apollo/client/core';

export const GET_CHANNEL_SOCIAL_CHANNELS = gql`
  query getChannelSocialChannels(
    $first: Int
    $page: Int
    $whereCondition: QuerySocialChannelsWhereWhereConditions
  ) {
    socialChannels(first: $first, page: $page, where: $whereCondition) {
      data {
        id
        uuid
        slug
        name
        description
        entity_namespace
        entity_id
        messages {
          id
          uuid
          message
        }
        users {
          id
          uuid
          email
          displayname
          lastname
          firstname
          default_company
          default_company_branch
        }
        systemModule {
          id
        }
      }
    }
  }
`;
