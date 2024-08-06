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
        slug
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

export const GET_MESSAGES_BY_DISPLAYNAME_AND_SLUG = gql`
  query getMessages(
    $slug: Mixed!
    $displayname: Mixed!
  ) {
    messages(
      where: {
        column: SLUG, operator: EQ, value: $slug
      }
      hasUser: {
        column: DISPLAYNAME, operator: EQ, value: $displayname
      }
    ) {
      data {
        id
        uuid
        message
        parent_id
        slug
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
    }
  }
`;

export const GET_MESSAGES_GROUP_BY_DATE_QUERY = gql`
  query messagesGroupByDate(
    $where: QueryMessagesGroupByDateWhereWhereConditions
    $hasAppModuleMessage: QueryMessagesGroupByDateHasAppModuleMessageWhereHasConditions
    $orderBy: [QueryMessagesGroupByDateOrderByOrderByClause!]
    $search: String
    $first: Int! = 25
    $page: Int
  ) {
    messagesGroupByDate(
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
        additional_field
        slug
        user {
          id
          firstname
          lastname
          displayname
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
