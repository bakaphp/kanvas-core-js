import { gql } from '@apollo/client/core';

export const GET_ALL_LEADS_QUERY = gql`
  query {
    leads {
      data {
        id
        uuid
        title
        company {
          id
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
    }
  }
`;

export const GET_LEADS_DASHBOARD_QUERY = gql`
query GetLeadsDashboard (
  $first: Int!, 
  $where: QueryLeadsDashboardWhereWhereConditions!){
  leadsDashboard(
    first: $first, 
    where: $where ) {
      data {
          total_active_leads
          total_closed_leads
          total_agents
      }
      
  }
}
`

export const GET_LEAD_BY_UUID_QUERY = gql`
query GetLeadsByUUID($where: QueryLeadsWhereWhereConditions!){
  leads(where: $where) {
      data {
          id,
          uuid,
          title,
          company{
              id
          }
          people{
              name
              contacts {
                  type {
                      name
                  }
                  value
              }
          },
          receiver{
              name
              uuid
          },
          status {
              name
          },
          type {
              name
          },
          source{
              name
          },
          pipeline {
              name
          },
          stage {
              name
          },
          custom_fields{
              data {
                  name, 
                  value
              }
          }
      }
  }
}
`