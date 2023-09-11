import { UserData } from "./users";

export interface Interactions {
    like: boolean;
    save: boolean;
    dislike: boolean;
}

export interface UserInteraction {
    id: string;
    user?: UserData;
    interactions: Interactions;
    entity_id: string;
    entity_namespace: string;
    interactions_id: string;
}

export interface UserInteractionInput {
    entity_id: string;
    entity_namespace: string;
}

export interface ResponseUserLikeEntity {
    userLikeEntity: boolean;
}

export interface ResponseUserUnLikeEntity {
    userUnLikeEntity: boolean;
}

export interface ResponseUserDislikeEntity {
    userDislikeEntity: boolean;
}