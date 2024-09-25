import { gql } from '@apollo/client/core';

export const CREATE_FILESYSTEM_MAPPER_MUTATION = gql`
  mutation createFilesystemMapper($input: FilesystemMapperInput!) {
    createFilesystemMapper(input: $input) {
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
  }
`;

export const FILESYSTEM_IMPORT_MUTATION = gql`
  mutation filesystemImport($input: FilesystemImportInput!) {
    filesystemImport(input: $input) {
      id
      filesystemMapper {
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
      filesystem {
        id
        uuid
        name
        url
        type
        size
        field_name
      }
      results
    }
  }
`;

export const UPDATE_FILESYSTEM_MAPPER_MUTATION = gql`
  mutation updateFilesystemImport($input: UpdateFilesystemImportInput!) {
    updateFilesystemImport(input: $input) {
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
  }
`;

export const DELETE_FILESYSTEM_MAPPER_MUTATION = gql`
  mutation deleteFilesystemMapper($id: ID!) {
    deleteFilesystemMapper(id: $id)
  }
`;
