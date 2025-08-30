import { gql } from "@apollo/client/core";
export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      id
    }
  }
`;
