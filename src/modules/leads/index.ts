import { ClientType } from '../../index';
import {
    CREATE_LEAD_MUTATION
} from '../../mutations';
import {
  CreateLeadData,
  CreateLeadParams,
  LeadInput,
} from '../../types';

export class Leads {
  constructor(protected client: ClientType) {}

  public async createLead(
    leadData: CreateLeadParams | LeadInput
  ): Promise<CreateLeadData> {

  
    const response = await this.client.mutate({
      mutation: CREATE_LEAD_MUTATION,
      variables: { input: leadData },
    });

    return response.data as CreateLeadData;
 }

}
