import { gql } from "@apollo/client/core";

export const EVENT_QUERY = gql`
  query Events(
    $first: Int
    $page: Int
    $orderBy: [QueryEventsOrderByOrderByClause!]
  ) {
    events(first: $first, page: $page, orderBy: $orderBy) {
      data {
        id
        name
        type {
          name
        }
        eventStatus {
          id
          name
        }
        versions {
          data {
            id
            dates {
              date
            }
            total_attendees
          }
        }
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
      }
    }
  }
`;

export const EVENT_TYPES_QUERY = gql`
  query EventCategories {
    eventTypes {
      data {
        id
        name
      }
    }
  }
`;

export const EVENT_PARTICIPANTS_QUERY = gql`
  query EventVersionParticipants(
    $first: Int
    $page: Int
    $where: QueryEventVersionParticipantsWhereWhereConditions
  ) {
    eventVersionParticipants(first: $first, page: $page, where: $where) {
      data {
        participant {
          id
          people {
            id
            name
            tags {
              data {
                id
                name
              }
            }
            custom_fields {
              data {
                name
                value
              }
            }
            contacts {
              type {
                name
              }
              value
            }
          }
        }
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
      }
    }
  }
`;
