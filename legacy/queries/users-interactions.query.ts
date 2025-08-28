import { gql } from '@apollo/client/core';

export const GET_USERS_INTERACTIONS_QUERY = gql`
    query GetUsersInteractions($where: QueryGetUsersInteractionsWhereWhereConditions) {
        getUsersInteractions(where: $where) {
            data {
                id
                user{
                    id
                }
                entity_id,
                entity_namespace,
                interactions{
                    id,
                    title,
                    name
                }
            }
        }
    }
`;

export const GET_USER_INTERACTION_QUERY = gql`
    query GetUserInteraction($entity_id: ID!, $entity_namespace: String!) {
        getUserInteraction(entity_id: $entity_id, entity_namespace: $entity_namespace) {
                entity_id,
                entity_namespace,
                interactions
            
        }
    }
`;