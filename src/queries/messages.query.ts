import { gql } from '@apollo/client/core';

export const GET_MESSAGES_QUERY = gql`
  query getMessages(
    $where: QueryMessagesWhereWhereConditions
    $hasAppModuleMessage: QueryMessagesHasAppModuleMessageWhereHasConditions
    $orderBy: [QueryMessagesOrderByOrderByClause!]
    $search: String
    $first: Int! = 25
    $page: Int
  ) {
    messages(
      where: $where
      hasAppModuleMessage: $hasAppModuleMessage
      orderBy: $orderBy
      search: $search
      first: $first
      page: $page
    ) {
      data {
        id
        uuid
        message
        parent_id
        user {
          id
          firstname
          lastname
          displayname
        }
        appModuleMessage {
          entity_id
          system_modules
        }
        message_types_id
        message
        reactions_count
        comment_count
        total_liked
        total_saved
        parent {
          id
          uuid
        },
        myInteraction {
            is_liked,
            is_saved,
            is_shared,
            is_reported
        }
      }
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
`;
