import { gql } from '@apollo/client/core';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($input: MessageInput!) {
    createMessage(input: $input) {
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
      }
    }
  }
`;

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation updateMessage($id: ID!, $input: MessageUpdateInput!) {
    updateMessage(id: $id, input: $input) {
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
      }
    }
  }
`;

export const DELETE_MESSAGE_MUTATION = gql`
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id)
  }
`;

export const DELETE_MULTIPLE_MESSAGE_MUTATION = gql`
  mutation deleteMultipleMessages($ids: [ID!]!) {
    deleteMultipleMessages(ids: $ids)
  }
`;

export const DELETE_ALL_MESSAGE_MUTATION = gql`
  mutation deleteAllMessages {
    deleteAllMessages
  }
`;

export const LIKE_MESSAGE_MUTATION = gql`
  mutation likeMessage($id: ID!) {
    likeMessage(id: $id)
  }
`;

export const DISLIKE_MESSAGE_MUTATION = gql`
  mutation disLikeMessage($id: ID!) {
    disLikeMessage(id: $id)
  }
`;

export const VIEW_MESSAGE_MUTATION = gql`
  mutation viewMessage($id: ID!) {
    viewMessage(id: $id)
  }
`;

export const SHARE_MESSAGE_MUTATION = gql`
  mutation shareMessage($id: ID!) {
    shareMessage(id: $id)
  }
`;

export const INTERACTION_MESSAGE_MUTATION = gql`
  mutation interactionMessage($id: ID!, $type: InteractionType!) {
    interactionMessage(id: $id, type: $type) {
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
      }
    }
  }
`;

export const ATTACH_TOPIC_TO_MESSAGE_MUTATION = gql`
  mutation attachTopicToMessage($message_id: ID!, $topic_id: ID!) {
    attachTopicToMessage(message_id: $message_id, topic_id: $topic_id) {
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
      }
    }
  }
`;
export const DETACH_TOPIC_TO_MESSAGE_MUTATION = gql`
  mutation detachTopicToMessage($message_id: ID!, $topic_id: ID!) {
    detachTopicToMessage(message_id: $message_id, topic_id: $topic_id) {
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
      }
    }
  }
`;
