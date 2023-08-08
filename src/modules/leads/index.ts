import {
  GET_ALL_LEADS_QUERY,
  GET_LEADS_DASHBOARD_QUERY,
  GET_LEAD_BY_UUID_QUERY,
} from '../../queries';
import { ClientType } from '../../index';
import { CREATE_LEAD_MUTATION } from '../../mutations';
import {
  CreateLeadData,
  CreateLeadParams,
  LeadInput,
  LeadsDashboardData,
  WhereCondition,
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

  public async getAllLeads(): Promise<CreateLeadData> {
    const response = await this.client.query({
      query: GET_ALL_LEADS_QUERY,
    });

    return response.data;
  }

  public async getLeadsDashboard(userID: number): Promise<LeadsDashboardData> {
    const first: number = 1;
    const where: WhereCondition = {
      column: 'USERS_ID',
      operator: 'EQ',
      value: userID,
    };

    const response = await this.client.mutate({
      mutation: GET_LEADS_DASHBOARD_QUERY,
      variables: { first, where },
    });

    return response.data;
  }

  public async getLeadByUUID(uuid: string): Promise<CreateLeadData> {
    const where: WhereCondition = {
      column: 'UUID',
      operator: 'EQ',
      value: uuid,
    };

    const response = await this.client.mutate({
      mutation: GET_LEAD_BY_UUID_QUERY,
      variables: { where },
    });

    return response.data;
  }
}
