import { gql } from "@apollo/client/core";

export const GET_MESSAGES_QUERY = (includeChildren: boolean, alias: string) =>
  gql`
  query getMessages(
    $where: QueryMessagesWhereWhereConditions
    $hasAppModuleMessage: QueryMessagesHasAppModuleMessageWhereHasConditions
    $hasTags: QueryMessagesHasTagsWhereHasConditions
    $requiredTags: [String!]
    $hasType: QueryMessagesHasTypeWhereHasConditions
    $orderBy: [QueryMessagesOrderByOrderByClause!]
    $search: String
    $first: Int! = 25
    $page: Int
    ${includeChildren ? `$childrenFirst: Int!` : ""}
  ) {
    messages(
      where: $where
      hasAppModuleMessage: $hasAppModuleMessage
      hasTags: $hasTags
      requiredTags: $requiredTags
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
          social {
            is_blocked
            is_following
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
        is_public
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
            is_purchased
        }
        ${
    includeChildren
      ? `${alias}: children(first: $childrenFirst) {
          data {
            id
            uuid
            message
            slug
            user {
              id
              firstname
              lastname
              displayname
              photo {
                url
              }
              social {
                is_blocked
                is_following
              }
            }
          }
        }`
      : ""
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

export const GET_FOR_YOU_MESSAGES_QUERY = (
  includeChildren: boolean,
  alias: string,
) =>
  gql`
  query forYouMessages(
    $where: QueryForYouMessagesWhereWhereConditions
    $hasTags: QueryForYouMessagesHasTagsWhereHasConditions
    $hasType: QueryForYouMessagesHasTypeWhereHasConditions
    $orderBy: [QueryForYouMessagesOrderByOrderByClause!]
    $first: Int! = 25
    $page: Int
    ${includeChildren ? `$childrenFirst: Int!` : ""}
  ) {
    forYouMessages(
      where: $where
      hasTags: $hasTags
      hasType: $hasType
      orderBy: $orderBy
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
          social {
            is_blocked
            is_following
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
        is_public
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
            is_purchased
        }
        ${
    includeChildren
      ? `${alias}: children(first: $childrenFirst) {
          data {
            id
            uuid
            message
            slug
            user {
              id
              firstname
              lastname
              displayname
              photo {
                url
              }
              social {
                is_blocked
                is_following
              }
            }
          }
        }`
      : ""
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
        is_public
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
            is_purchased
        }
        created_at
      }
    }
  }
`;

export const GET_CHANNEL_MESSAGES_QUERY = (
  includeChildren: boolean,
  alias: string,
) =>
  gql`
  query channelMessages(
    $channel_uuid: String
    $channel_slug: String
    $where: QueryChannelMessagesWhereWhereConditions
    $orderBy: [QueryChannelMessagesOrderByOrderByClause!]
    $first: Int! = 25
    $page: Int
    ${includeChildren ? `$childrenFirst: Int!` : ""}
  ) {
    channelMessages(
      channel_uuid: $channel_uuid
      channel_slug: $channel_slug
      where: $where
      orderBy: $orderBy
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
        is_public
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
          is_purchased
        }
        ${
    includeChildren
      ? `${alias}: children(first: $childrenFirst) {
          data {
            id
            uuid
            message
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
          }
        }`
      : ""
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
        is_public
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
            is_purchased
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

export const GET_MESSAGES_LIKED_BY_USER = (
  includeChildren: boolean,
  alias: string,
) =>
  gql`
  query messagesLikedByUser(
    $id: ID!
    $first: Int! = 25
    $page: Int
    $where: QueryMessagesLikedByUserWhereWhereConditions
    $orderBy: [QueryMessagesLikedByUserOrderByOrderByClause!]
    ${includeChildren ? `$childrenFirst: Int!` : ""}
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
        is_public
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
          is_purchased
        }
        ${
    includeChildren
      ? `${alias}: children(first: $childrenFirst) {
          data {
            id
            uuid
            message
            slug
            user {
              id
              firstname
              lastname
              displayname
              photo {
                url
              }
              social {
                is_blocked
                is_following
              }
            }
          }
        }`
      : ""
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

export const GET_FOLLOWING_FEED_QUERY = (
  includeChildren: boolean,
  alias: string,
) =>
  gql`
  query followingFeedMessages(
    $where: QueryFollowingFeedMessagesWhereWhereConditions
    $hasTags: QueryFollowingFeedMessagesHasTagsWhereHasConditions
    $hasType: QueryFollowingFeedMessagesHasTypeWhereHasConditions
    $orderBy: [QueryFollowingFeedMessagesOrderByOrderByClause!]
    $first: Int! = 25
    $page: Int
    ${includeChildren ? `$childrenFirst: Int!` : ""}
  ) {
    followingFeedMessages(
      where: $where
      hasTags: $hasTags
      hasType: $hasType
      orderBy: $orderBy
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
          social {
            is_blocked
            is_following
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
        is_public
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
            is_purchased
        }
        ${
    includeChildren
      ? `${alias}: children(first: $childrenFirst) {
          data {
            id
            uuid
            message
            slug
            user {
              id
              firstname
              lastname
              displayname
              photo {
                url
              }
              social {
                is_blocked
                is_following
              }
            }
          }
        }`
      : ""
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
