import { gql } from "@apollo/client/core";

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
