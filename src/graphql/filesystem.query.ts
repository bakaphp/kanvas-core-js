import { gql } from "@apollo/client";

export const ENTITY_FILES_QUERY = gql`
  query entityFiles(
    $entity: SystemModuleEntityInput!
    $where: QueryEntityFilesWhereWhereConditions
    $first: Int
    $page: Int
  ) {
    entityFiles(entity: $entity, where: $where, first: $first, page: $page) {
      data {
        id
        uuid
        name
        url
        type
        size
        field_name
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;

export const FILESYSTEM_MAPPER_QUERY = gql`
  query filesystemMappers(
    $first: Int
    $page: Int
    $search: String
    $where: QueryFilesystemMappersWhereWhereConditions
  ) {
    filesystemMappers(
      first: $first
      page: $page
      search: $search
      where: $where
    ) {
      data {
        id
        name
        file_header
        mapping
        configuration
        system_module {
          id
          name
        }
        created_at
        updated_at
      }
      paginatorInfo {
        currentPage
        lastPage
        hasMorePages
        total
      }
    }
  }
`;
