import { gql } from '@apollo/client/core';

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
          name
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
      }
    }
  }
`;
