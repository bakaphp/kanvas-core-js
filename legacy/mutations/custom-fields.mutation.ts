import { gql } from "@apollo/client/core";

export const SET_CUSTOM_FIELD = gql`
  mutation setCustomField($input: CustomFieldInput!) {
    setCustomField(input: $input)   
  }
`;

export const GET_CUSTOM_FIELD = gql`
  mutation getCustomField($input: CustomFieldInput!) {
    getCustomField(input: $input)   
  }
`;

export const GET_ALL_CUSTOM_FIELDS = gql`
  mutation getAllCustomField($input: CustomFieldInput!) {
    getAllCustomField(input: $input)   
  }
`;

export const DELETE_CUSTOM_FIELD = gql`
  mutation deleteCustomField($input: CustomFieldInput!) {
    deleteCustomField(input: $input)   
  }
`;
