import { ClientType } from "../../__index";

import { SYSTEM_MODULES_QUERY } from "../../queries/";
import { SystemModuleInterface } from "../../types/";

export class SystemModules {
  constructor(protected client: ClientType) {}

  public async getSystemModules(
    first: number,
    page?: number,
  ): Promise<SystemModuleInterface[]> {
    const response = await this.client.query({
      query: SYSTEM_MODULES_QUERY,
      variables: {
        first,
        page,
      },
    });
    return response.data.systemModels.data as SystemModuleInterface[];
  }

  public async getSystemModulesBySlug(
    slug: string,
  ): Promise<SystemModuleInterface[]> {
    const response = await this.client.query({
      query: SYSTEM_MODULES_QUERY,
      variables: {
        first: 1,
        where: {
          column: "SLUG",
          operator: "EQ",
          value: slug,
        },
      },
    });
    return response.data.systemModels.data as SystemModuleInterface[];
  }
}
