import { gql } from '@apollo/client/core';

export const CREATE_LEAD_MUTATION = gql`
  mutation createLead($input: LeadInput!) {
    createLead(input: $input) {
      id
      uuid
      title
      custom_fields {
        name
        value
      }
    }
  }
`;