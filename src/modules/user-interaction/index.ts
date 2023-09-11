import {
    userLikeEntity,
    userUnLikeEntity,
    userDislikeEntity
} from '../../mutations/user-interaction';
import {
    UserInteractionInput,
    ResponseUserLikeEntity,
    ResponseUserUnLikeEntity,
    ResponseUserDislikeEntity
} from '../../types/user-interaction';
import { ClientType } from '../../index';

export class UsersInteractions {

    constructor(protected client: ClientType) {}

    public async userLikeEntity(
        input: UserInteractionInput
    ): Promise<ResponseUserLikeEntity> {
        const response = await this.client.mutate({
            mutation: userLikeEntity,
            variables: { input: input }
        });

        return response.data;
    }

    public async userUnLikeEntity(
        input: UserInteractionInput
    ): Promise<ResponseUserUnLikeEntity> {
        const response = await this.client.mutate({
            mutation: userUnLikeEntity,
            variables: { input: input }
        });

        return response.data;
    }

    public async userDislikeEntity(
        input: UserInteractionInput
    ): Promise<ResponseUserDislikeEntity> {
        const response = await this.client.mutate({
            mutation: userDislikeEntity,
            variables: { input: input }
        });

        return response.data;
    }
}