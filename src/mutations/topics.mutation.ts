import { gql } from '@apollo/client/core';

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

export const FOLLOW_TOPIC_MUTATION = gql`
  mutation followTopic($id: ID!) {
    followTopic(id: $id)
  }
`;

export const UnFOLLOW_TOPIC_MUTATION = gql`
  mutation unFollowTopic($id: ID!) {
    unFollowTopic(id: $id)
  }
`;
