import {
    USER_LIKE_ENTITY,
    USER_UNlIKE_ENTITY,
    USER_DISLIKE_ENTITY
} from '../../mutations/';
import {
    UserInteractionInput,
    ResponseUserLikeEntity,
    ResponseUserUnLikeEntity,
    ResponseUserDislikeEntity,
    UserInteraction,
    EntityInteraction
} from '../../types/';
import { ClientType } from '../../__index';
import { GET_USERS_INTERACTIONS_QUERY, GET_USER_INTERACTION_QUERY } from '../../queries';
export class UsersInteractions {

    constructor(protected client: ClientType) {}

    public async userLikeEntity(
        input: UserInteractionInput
    ): Promise<ResponseUserLikeEntity> {
        const response = await this.client.mutate({
            mutation: USER_LIKE_ENTITY,
            variables: { input: input }
        });

        return response.data;
    }

    public async userUnLikeEntity(
        input: UserInteractionInput
    ): Promise<ResponseUserUnLikeEntity> {
        const response = await this.client.mutate({
            mutation: USER_UNlIKE_ENTITY,
            variables: { input: input }
        });

        return response.data;
    }

    public async userDislikeEntity(
        input: UserInteractionInput
    ): Promise<ResponseUserDislikeEntity> {
        const response = await this.client.mutate({
            mutation: USER_DISLIKE_ENTITY,
            variables: { input: input }
        });

        return response.data;
    }

    public async getUsersInteractions(): Promise<UserInteraction> {
        const response = await this.client.query({
            query: GET_USERS_INTERACTIONS_QUERY
        });
        return response.data.getUsersInteractions;
    }

    public async getUserInteraction(
        entity_id: string,
        entity_namespace: string): Promise<EntityInteraction> {
        
        const response = await this.client.query({
            query: GET_USER_INTERACTION_QUERY,
            variables: { entity_id: entity_id, entity_namespace: entity_namespace }
        });
        return response.data.getUserInteraction;
    }

}