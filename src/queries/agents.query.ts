import { gql } from '@apollo/client/core';

/*
 TODO: Missing paginatorInfo 
 TODO: Missing number of leads created
 TODO: Missing Lead Funding
 TODO: Missing Status of agents
 TODO: Missing registration date
*/

export const GET_ALL_AGENTS_QUERY = gql`
  query GetAgents($first: Int, $page: Int) {
    agents(first: $first, page: $page) {
      data {
        member_id
        name
        status_id
        total_leads
        user {
          displayname
          created_at
          contact{
            phone_number
            cell_phone_number
           }
        }
      }
    }
  }
`;
