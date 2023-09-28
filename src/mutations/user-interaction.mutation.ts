import { gql } from '@apollo/client/core';

export const USER_LIKE_ENTITY = gql`
    mutation($input: UserInteractionInput!) {
        userLikeEntity(input: $input)
    }
`;

export const USER_UN_lIKE_ENTITY = gql`
    mutation($input: UserInteractionInput!) {
        userUnLikeEntity(input: $input)
    }
`;

export const  USER_DIS_LIKE_ENTITY = gql`
    mutation($input: UserInteractionInput!) {
        userDislikeEntity(input: $input)
    }
`;
