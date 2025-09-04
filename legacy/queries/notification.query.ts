import { gql } from "@apollo/client/core";

export const NOTIFICATION_QUERY = gql`
  query notifications(
    $where: QueryNotificationsWhereWhereConditions
    $whereEntity: NotificationEntityFilterInput
    $whereType: NotificationTypeFilterInput
    $orderBy: [QueryNotificationsOrderByOrderByClause!]
    $whereSystemModule: SystemModuleFilterInput
    $whereInteraction: InteractionsFilterInput
    $first: Int
    $page: Int
  ) {
    notifications(
      where: $where
      whereEntity: $whereEntity
      whereType: $whereType
      orderBy: $orderBy
      whereSystemModule: $whereSystemModule
      whereInteraction: $whereInteraction
      first: $first
      page: $page
    ) {
      data {
        id
        users {
          id
          displayname
          email
        }
        fromUsers {
          id
          displayname
          email
        }
        companies {
          id
          name
        }
        systemModule {
          id
          name
          slug
        }
        types {
          id
          name
          key
          verb
          event
          description
          template
          weight
          is_published
        }
        entity_id
        entity
        content
        read
        content_group
        created_at
        updated_at
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
        count
      }
    }
  }
`;

export const NOTIFICATION_TYPE_QUERY = gql`
  query notificationTypes(
    $where: QueryNotificationTypesWhereWhereConditions
    $orderBy: [QueryNotificationTypesOrderByOrderByClause!]
    $first: Int
    $page: Int
  ) {
    notificationTypes(
      where: $where
      orderBy: $orderBy
      first: $first
      page: $page
    ) {
      data {
        id
        systemModule {
          id
          name
          slug
        }
        parent {
          id
          name
          key
          verb
          event
          description
          template
          weight
          is_published
        }
        channel {
          id
          name
          slug
        }
        name
        key
        verb
        event
        description
        template
        weight
        is_published
        created_at
        updated_at
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
        count
      }
    }
  }
`;

export const NOTIFICATION_CHANNEL_QUERY = gql`
  query notificationChannels(
    $where: QueryNotificationChannelsWhereWhereConditions
    $orderBy: [QueryNotificationChannelsOrderByOrderByClause!]
    $first: Int
    $page: Int
  ) {
    notificationChannels(
      where: $where
      orderBy: $orderBy
      first: $first
      page: $page
    ) {
      data {
        id
        name
        slug
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
        count
      }
    }
  }
`;
