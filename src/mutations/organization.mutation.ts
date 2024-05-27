import { gql } from '@apollo/client/core';

export const UPDATE_ORGANIZATION_MUTATION = gql`
mutation updateOrganization($id: ID!, $input: OrganizationInput!) {
    updateOrganization(id: $id, input: $input) {
      name
      id
      uuid
      company {
        uuid
        id
        name
      }
    }
  }
`;
