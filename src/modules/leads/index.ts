import { GET_ALL_LEADS_QUERY, GET_LEADS_DASHBOARD_QUERY } from '../../queries';
import { ClientType } from '../../index';
import { CREATE_LEAD_MUTATION } from '../../mutations';
import { 
  CreateLeadData, 
  CreateLeadParams, 
  LeadInput, 
  LeadsDashboardInput, 
  LeadsDashboardData 
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

  public async getLeadsDashboard(
    leadDashboardInput: LeadsDashboardInput
  ): Promise<LeadsDashboardData> {
    const response = await this.client.mutate({
      mutation: GET_LEADS_DASHBOARD_QUERY,
      variables: { ...leadDashboardInput  },
    });

    return response.data 
  }

}
