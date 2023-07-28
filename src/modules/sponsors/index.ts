import { ClientType } from '../../index';
import { INVITE_SPONSOR_MUTATION } from '../../mutations';
import { InviteSponsorData, InviteSponsorParams } from '../../types';

export class Sponsors {
    constructor(protected client: ClientType) {}

    public async createLead(
        leadData: InviteSponsorParams 
    ): Promise<InviteSponsorData> {
        const response = await this.client.mutate({
            mutation: INVITE_SPONSOR_MUTATION,
            variables: { input: leadData },
        });

        return response.data 
    }

}
