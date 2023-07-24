import { gql } from '@apollo/client/core';

export const CREATE_LEAD_MUTATION = gql`
  mutation createLead($input: LeadInput!) {
    createLead(input: $input) {
      id
      uuid
      title
      firstname
      lastname 
      created_at
      description
      reason_lost
      owner {
        id
        firstname 
        lastname
      }
      user {
        id
        firstname 
        lastname
      }
      company{
        id
        name
      }
      status {
        id
        name
        is_default
      }
      custom_fields {
        data {
          name
          value
        }
      }
    }
  }
`;