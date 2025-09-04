import { gql } from "@apollo/client/core";

export const USER_LIKE_ENTITY = gql`
    mutation($input: UserInteractionInput!) {
        userLikeEntity(input: $input)
    }
`;

export const USER_UNlIKE_ENTITY = gql`
    mutation($input: UserInteractionInput!) {
        userUnLikeEntity(input: $input)
    }
`;

export const USER_DISLIKE_ENTITY = gql`
    mutation($input: UserInteractionInput!) {
        userDislikeEntity(input: $input)
    }
`;
