import { gql } from '@apollo/client/core';
export const MESSAGES_TYPES_QUERY = gql`
  query messageTypes($where: QueryMessageTypesWhereColumn) {
    messageTypes(where: $where) {
      data {
        id
        name
        languages_id
        verb
        template
        templates_plura
      }
    }
  }
`;
