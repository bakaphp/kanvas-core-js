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
      user {
        id
        firstname
        lastname
      }
      owner {
        id
        firstname
        lastname
        displayname
      }
      company {
        id
        name
      }
      organization {
        name
      }
      people {
        name
        contacts {
          type {
            name
          }
          value
        }
      }
      receiver {
        name
        uuid
      }
      status {
        id
        name
        is_default
      }
      type {
        name
      }
      source {
        name
      }
      pipeline {
        name
      }
      stage {
        name
      }
      custom_fields {
        data {
          name
          value
        }
      }
      files {
        data {
          name
          url
        }
      }
    }
  }
`;
