import { ClientType } from '../../index';
import { INVITE_USER_MUTATION } from '../../mutations';
import { InviteUserData, InviteUserParams } from '../../types';

export class Sponsors {
    constructor(protected client: ClientType) {}

    public async inviteSponsor(
        inviteInput: InviteUserParams 
    ): Promise<InviteUserData> {
        const response = await this.client.mutate({
            mutation: INVITE_USER_MUTATION,
            variables: { input: inviteInput },
        });

        return response.data 
    }

}
