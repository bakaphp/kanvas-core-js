import { ClientType } from '../../index';

import { SYSTEM_MODULES_QUERY } from '../../queries/';
import { SystemModuleInterface } from '../../types/';

export class SystemModules {
  constructor(protected client: ClientType) {}

  public async getSystemModules(): Promise<SystemModuleInterface[]> {
    const response = await this.client.query({
      query: SYSTEM_MODULES_QUERY,
    });
    return response.data.systemModels.data as SystemModuleInterface[];
  }
}
