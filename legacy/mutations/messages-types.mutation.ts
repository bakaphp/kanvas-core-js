import { gql } from "@apollo/client/core";
export const CREATE_MESSAGE_TYPE_MUTATION = gql`
  mutation createMessageType($input: CreateMessageTypeInput!) {
    createMessageType(input: $input) {
      id
      name
      languages_id,
      verb,
      template,
      templates_plura
    }
  }
`;

export const UPDATE_MESSAGE_TYPE_MUTATION = gql`
  mutation updateMessageType($id: Int!, $input: CreateMessageTypeInput!) {
    updateMessageType(id: $id, input: $input) {
      id
      name
      languages_id,
      verb,
      template,
      templates_plura
    }
  }
`;
