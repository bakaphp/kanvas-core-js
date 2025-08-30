import { gql } from "@apollo/client/core";

export const GET_ALL_LEADS_QUERY = gql`
  query GetLeads($first: Int, $page: Int) {
    leads(
      first: $first
      page: $page
      orderBy: { column: CREATED_AT, order: DESC }
    ) {
      data {
        id
        uuid
        title
        firstname
        lastname
        created_at
        description
        reason_lost
        user {
          firstname
          lastname
        }
        owner {
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
          id
        }
        people {
          id
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
        }
        branch{
          id
          uuid
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
        files {
          data {
            name
            url
          }
        }
        custom_fields {
          data {
            name
            value
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
      }
      paginatorInfo {
        currentPage
        perPage
        firstItem
        lastItem
        total
        count
        lastPage
        hasMorePages
      }
    }
  }
`;
export const LEAD_DELETE_MUTATION = gql`
  mutation deleteLead($id: ID!) {
    deleteLead(id: $id)
  }
`;
export const GET_LEADS_DASHBOARD_QUERY = gql`
  query GetLeadsDashboard(
    $first: Int!
    $where: QueryLeadsDashboardWhereWhereConditions!
  ) {
    leadsDashboard(first: $first, where: $where) {
      data {
        total_active_leads
        total_closed_leads
        total_agents
      }
    }
  }
`;

export const GET_LEAD_BY_UUID_QUERY = gql`
  query GetLeadsByUUID($where: QueryLeadsWhereWhereConditions!) {
    leads(where: $where) {
      data {
        id
        uuid
        title
        firstname
        lastname
        created_at
        description
        reason_lost
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
        user {
          firstname
          lastname
        }
        owner {
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
          id
        }
        people {
          id
          uuid
          name
          contacts {
            type {
              id
              name
            }
            value
          }
        }
        receiver {
          name
          uuid
        }
        branch{
          id
          uuid
        }
        status {
          name
          id
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
        followers {
          data {
            id
            firstname
            lastname
            email
          }
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
  }
`;
