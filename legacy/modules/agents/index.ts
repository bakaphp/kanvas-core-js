import {
  GET_ALL_AGENTS_QUERY,
  GET_AGENTS_BY_USER_ID_QUERY,
} from '../../queries';
import { ClientType } from '../../__index';

import { AgentsData, WhereCondition } from '../../types';

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

  public async getAgentsByUserID(id: string): Promise<AgentsData> {
    const where: WhereCondition = {
      column: 'USERS_ID',
      operator: 'EQ',
      value: id,
    };

    const response = await this.client.query({
      query: GET_AGENTS_BY_USER_ID_QUERY,
      variables: { where },
    });

    return response.data;
  }
}
