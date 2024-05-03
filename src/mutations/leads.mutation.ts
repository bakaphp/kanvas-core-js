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
      systemModule {
        id
        uuid
        slug
        model_name
        parent {
          id
          uuid
          slug
          model_name
        }
        menu_order
        show
      }
      channels {
        id
        name
        uuid
        slug
        description
        entity_namespace
        entity_id
        last_message_id
        messages {
          id
          parent_id
          parent_unique_id
          uuid
          companies_id
          users_id
          message_types_id
          message
          reactions_count
          comment_count
          total_liked
          total_saved
          total_shared
        }
      }
    }
  }
`;
export const UPDATE_LEAD_MUTATION = gql`
  mutation updateLead($id: ID!, $input: UpdateLeadInput!) {
    updateLead(id: $id, input: $input) {
      id
      branch_id
      title
      people_id
      organization_id
      leads_owner_id
      receiver_id
      status_id
      type_id
      source_id
      description
      reason_lost
      pipeline_stage_id
      custom_fields {
        field_id
        value
      }
      files {
        id
        filename
        url
      }
    }
}`;
