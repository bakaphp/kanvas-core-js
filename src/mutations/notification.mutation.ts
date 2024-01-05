import { gql } from '@apollo/client/core';

export const READ_ALL_NOTIFICATIONS_MUTATION = gql`
  mutation readAllNotifications {
    readAllNotifications
  }
`;

export const SEND_NOTIFICATION_BASE_TEMPLATE_MUTATION = gql`
  mutation sendNotificationBaseTemplate(
    $template_name: String!
    $data: Mixed!
    $via: [String!]!
    $users_id: [Int!]!
  ) {
    sendNotificationBaseTemplate(
      template_name: $template_name
      data: $data
      via: $via
      users_id: $users_id
    )
  }
`;

export const SEND_NOTIFICATION_BY_MESSAGE_MUTATION = gql`
  mutation sendNotificationByMessage(
    $message: String!
    $via: [String!]!
    $users_id: [Int!]!
  ) {
    sendNotificationByMessage(
      message: $message
      via: $via
      users_id: $users_id
    ) {
      sent
      message
    }
  }
`;
