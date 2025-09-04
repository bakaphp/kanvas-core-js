import { gql } from "@apollo/client/core";
export const CREATE_PEOPLE_MUTATION = gql`
  mutation createPeople($input: PeopleInput!) {
    createPeople(input: $input) {
      id
      uuid
      name
      firstname
      lastname
      organizations {
        name
      }
      company {
        id
        name
      }
      user {
        id
        firstname
        lastname
        displayname
      }
      contacts {
        type {
          name
        }
        value
      }
      address {
        address
        city
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

export const UPDATE_PEOPLE_MUTATION = gql`
  mutation updatePeople($id: ID!, $input: PeopleInput!) {
    updatePeople(id: $id, input: $input) {
      id
      uuid
      name
      firstname
      lastname
      organizations {
        name
      }
      company {
        id
        name
      }
      user {
        id
        firstname
        lastname
        displayname
      }
      contacts {
        type {
          name
        }
        value
      }
      address {
        address
        city
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

export const DELETE_PEOPLE_MUTATION = gql`
  mutation deletePeople($id: ID!) {
    deletePeople(id: $id)
  }
`;

export const RESTORE_PEOPLE_MUTATION = gql`
  mutation restorePeople($id: ID!) {
    restorePeople(id: $id)
  }
`;
