import { gql } from "@apollo/client/core";

export const ENTITY_FILES_QUERY = gql`
  query entityFiles(
    $entity: SystemModuleEntityInput!
    $where: QueryEntityFilesWhereWhereConditions
  ) {
    entityFiles(entity: $entity, where: $where) {
      data {
        id
        uuid
        name
        url
      }
    }
  }
`;
