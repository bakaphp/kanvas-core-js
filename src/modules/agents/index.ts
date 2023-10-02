import { GET_ALL_AGENTS_QUERY } from '../../queries';
import { ClientType } from '../../index';

import { AgentsData } from '../../types';

export class Agents {
  constructor(protected client: ClientType) {}

  public async getAllAgents(
    first?: number,
    page?: number
  ): Promise<AgentsData> {
    const response = await this.client.query({
      query: GET_ALL_AGENTS_QUERY,
      variables: { first, page },
    });

    return response.data;
  }
}
