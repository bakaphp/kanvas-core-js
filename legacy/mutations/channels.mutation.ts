import { gql } from "@apollo/client/core";

export const CREATE_SOCIAL_CHANNEL_MUTATION = gql`
  mutation createSocialChannel($input: SocialChannelInput!) {
    createSocialChannel(input: $input) {
      id
      name
      slug
      description
      entity_namespace
      entity_id
      last_message_id
      messages {
        id
        uuid
        message
      }
      users {
        id
        uuid
        displayname
        email
        photo {
          id
          name
          url
        }
      }
    }
  }
`;

export const UPDATE_SOCIAL_CHANNEL_MUTATION = gql`
  mutation updateSocialChannel($id: ID!, $input: SocialChannelInput!) {
    updateSocialChannel(id: $id, input: $input) {
      id
      name
      slug
      description
      entity_namespace
      entity_id
      last_message_id
      messages {
        id
        uuid
        message
      }
      users {
        id
        uuid
        displayname
        email
        photo {
          id
          name
          url
        }
      }
    }
  }
`;

export const ATTACH_USER_TO_CHANNEL = gql`
  mutation attachUserToChannel($channel_id: ID!, $user_id: ID!) {
    attachUserToChannel(channel_id: $channel_id, user_id: $user_id) {
      id
      name
      slug
      description
      entity_namespace
      entity_id
      last_message_id
      messages {
        id
        uuid
        message
      }
      users {
        id
        uuid
        displayname
        email
        photo {
          id
          name
          url
        }
      }
    }
  }
`;
export const DETACH_USER_FROM_CHANNEL = gql`
  mutation detachUserFromChannel($channel_id: ID!, $user_id: ID!) {
    detachUserFromChannel(channel_id: $channel_id, user_id: $user_id) {
      id
      name
      slug
      description
      entity_namespace
      entity_id
      last_message_id
      messages {
        id
        uuid
        message
      }
      users {
        id
        uuid
        displayname
        email
        photo {
          id
          name
          url
        }
      }
    }
  }
`;
