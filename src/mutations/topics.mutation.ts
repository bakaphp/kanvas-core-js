import { gql } from '@apollo/client';

export const CREATE_TOPIC_MUTATION = gql`
  mutation createTopic($input: TopicInput!) {
    createTopic(input: $input) {
      id
      name
      slug
      weight
      is_feature
      status
    }
  }
`;

export const UPDATE_TOPIC_MUTATION = gql`
  mutation updateTopic($id: ID!, $input: TopicInput!) {
    updateTopic(id: $id, input: $input) {
      id
      name
      slug
      weight
      is_feature
      status
    }
  }
`;
