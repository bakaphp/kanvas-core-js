import { gql } from '@apollo/client/core';

export const GET_USER_DATA_QUERY = gql`
  query {
    me {
      id
      uuid
      firstname
      lastname
      displayname
      default_company_branch
      default_company
      contact {
        phone_number
        cell_phone_number
      }
      email
      branches {
        id
        uuid
        name
        phone
        company {
          name
          uuid
          id
        }
      }
      companies {
        id
        uuid
        name
      }
      roles
      abilities
      custom_fields {
        data {
          name
          value
        }
      }
    }
  }
`;

export const GET_ROLE_ID_BY_NAME_QUERY = gql`
  query GetRolesByName($where: QueryRolesWhereWhereConditions!) {
    roles(where: $where) {
      data {
        id
      }
    }
  }
`;
