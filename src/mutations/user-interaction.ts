import { gql } from '@apollo/client/core';

export const userLikeEntity = gql`
    mutation($input: UserInteractionInput!) {
        userLikeEntity(input: $input)
    }
`;

export const userUnLikeEntity = gql`
    mutation($input: UserInteractionInput!) {
        userUnLikeEntity(input: $input)
    }
`;

export const  userDislikeEntity = gql`
    mutation($input: UserInteractionInput!) {
        userDislikeEntity(input: $input)
    }
`;
