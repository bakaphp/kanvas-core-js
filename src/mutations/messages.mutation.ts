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