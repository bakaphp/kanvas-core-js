import { gql } from '@apollo/client/core';

export const CREATE_TAG = gql`
  mutation($input: TagInput!) {
    createTag(input: $input) {
      id
      user {
        id
      }
      slug
      name
      weight
      created_at
      updated_at
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation($id: ID!, $input: TagInput!) {
    updateTag(id: $id, input: $input) {
      id
      user {
        id
      }
      slug
      name
      weight
      created_at
      updated_at
    }
  }
`;

export const DELETE_TAG = gql`
  mutation($id: ID!) {
    deleteTag(id: $id)
  }
`;

export const ATTACH_TAG_TO_ENTITY = gql`
  mutation($input: AttachTagEntityInput!) {
    attachTagToEntity(input: $input)
  }
`;
