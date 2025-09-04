import { gql } from "@apollo/client";

export const ATTACH_FILE_MUTATION = gql`
  mutation attachFile($input: FilesystemAttachInput!) {
    attachFile(input: $input)
  }
`;

export const DETACH_FILE_MUTATION = gql`
  mutation deAttachFile($uuid: String!) {
    deAttachFile(uuid: $uuid)
  }
`;

export const DETACH_FILES_MUTATION = gql`
  mutation deAttachFiles($uuids: [String!]!) {
    deAttachFiles(uuids: $uuids)
  }
`;

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

export const UPDATE_FILESYSTEM_MAPPER_MUTATION = gql`
  mutation updateFilesystemMapper($input: UpdateFilesystemImportInput!) {
    updateFilesystemMapper(input: $input) {
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
