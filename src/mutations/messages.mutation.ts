import { gql } from '@apollo/client/core';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($input: MessageInput!) {
    createMessage(input: $input) {
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
    deleteMessage(id: $id) {
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
      }
    }
  }
`;

export const INTERACTION_MESSAGE_MUTATION = gql`
  mutation interactionMessage($id: ID!, $type: InteractionType!) {
    interactionMessage(id: $id, type: $type) {
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
