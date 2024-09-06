import { gql } from '@apollo/client/core';

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
      }
    }
  }
`;
