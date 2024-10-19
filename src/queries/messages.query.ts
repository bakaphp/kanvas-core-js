import { gql } from '@apollo/client/core';

export const GET_MESSAGES_QUERY = gql`
  query getMessages(
    $where: QueryMessagesWhereWhereConditions
    $hasAppModuleMessage: QueryMessagesHasAppModuleMessageWhereHasConditions
    $hasTags: QueryMessagesHasTagsWhereHasConditions
    $hasType: QueryMessagesHasTypeWhereHasConditions
    $orderBy: [QueryMessagesOrderByOrderByClause!]
    $search: String
    $first: Int! = 25
    $page: Int
  ) {
    messages(
      where: $where
      hasAppModuleMessage: $hasAppModuleMessage
      hasTags: $hasTags
      hasType: $hasType
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
          photo {
            url
          }
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
        total_disliked
        total_saved
        total_shared
        total_view
        total_children
        tags {
          data {
              id
              name
              slug
          }
        }
        parent {
          id
          uuid
        },
        myInteraction {
            is_liked
            is_disliked
            is_saved
            is_shared
            is_reported
        }
        created_at
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
          photo {
            url
          }
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
        total_disliked
        total_saved
        total_shared
        total_view
        total_children
        parent {
          id
          uuid
        }
        tags {
          data {
              id
              name
              slug
          }
        }
        myInteraction {
            is_liked
            is_disliked
            is_saved
            is_shared
            is_reported
        }
        created_at
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
          photo {
            url
          }
        }
        message_types_id
        message
        reactions_count
        comment_count
        total_liked
        total_disliked
        total_saved
        total_shared
        total_view
        total_children
        parent {
          id
          uuid
        }
        tags {
          data {
              id
              name
              slug
          }
        }
        myInteraction {
            is_liked
            is_disliked
            is_saved
            is_shared
            is_reported
        }
        created_at
      }
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
`;

export const GET_MESSAGE_SEARCH_SUGGESTIONS_QUERY = gql`
  query messageSearchSuggestions($search: String) {
    messageSearchSuggestions(search: $search)
  }
`;

export const GET_MESSAGES_LIKED_BY_USER = gql`
  query messagesLikedByUser(
    $id: ID!
    $first: Int! = 25
    $page: Int
    $where: QueryMessagesLikedByUserWhereWhereConditions
    $orderBy: [QueryMessagesLikedByUserOrderByOrderByClause!]
  ) {
    messagesLikedByUser(
      id: $id
      first: $first
      page: $page
      where: $where
      orderBy: $orderBy
    ) {
      data {
        id
        slug
        message
        parent_id
        user {
          id
          firstname
          lastname
          displayname
          photo {
            url
          }
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
        total_disliked
        total_saved
        total_shared
        total_view
        total_children
        tags {
          data {
            id
            name
            slug
          }
        }
        parent {
          id
          uuid
        }
        myInteraction {
          is_liked
          is_disliked
          is_saved
          is_shared
          is_reported
        }
        created_at
      }
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
`;
