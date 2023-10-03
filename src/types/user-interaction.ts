import { UserData } from "./users";

export interface Interactions {
    like: boolean;
    save: boolean;
    dislike: boolean;
}

export interface Interaction {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    created_at: string;
    updated_at: string;
    count: number;
}

export interface UserInteraction {
    id: string;
    user?: UserData;
    interactions: Interaction;
    entity_id: string;
    entity_namespace: string;
    interactions_id: string;
}
export interface EntityInteraction {
    entity_id: string;
    entity_namespace: string;
    interactions: string;
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