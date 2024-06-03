import { gql } from '@apollo/client/core';

export const READ_ALL_NOTIFICATIONS_MUTATION = gql`
  mutation readAllNotifications {
    readAllNotifications
  }
`;

export const SEND_NOTIFICATION_BASE_TEMPLATE_MUTATION = gql`
  mutation sendNotificationBaseOnTemplate(
    $template_name: String!
    $data: Mixed!
    $via: [String!]!
    $users: [Mixed!]!
  ) {
    sendNotificationBaseOnTemplate(
      template_name: $template_name
      data: $data
      via: $via
      users: $users
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

export const SEND_ANONYMOUS_NOTIFICATION_MUTATION = gql`
  mutation sendNotificationAnonymousBaseOnTemplate(
    $template_name: String!
    $data: Mixed!
    $email: Email!
    $subject: String!
  ) {
    sendNotificationAnonymousBaseOnTemplate(
      template_name: $template_name
      data: $data
      email: $email
      subject: $subject
    )
  }
`;
