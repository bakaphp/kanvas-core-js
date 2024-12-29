import axios from 'axios';

import { RunWorkflowFromEntity, WorkflowFromEntity } from 'types/workflow';
import { ClientType, Options } from '../../index';

import { RUN_WORKFLOW_FROM_ENTITY } from 'mutations/workflow';

export class Workflow {
  protected axiosClient: any;
  constructor(protected client: ClientType, protected options?: Options) {
    if (this.options) {
      this.axiosClient = axios.create({
        baseURL: this.options.url,
        headers: {
          'X-Kanvas-App': this.options.key,
          ...(this.options.adminKey && {
            'X-Kanvas-Key': this.options.adminKey,
          }),
        },
      });

      this.axiosClient.interceptors.request.use(
        this.options.authAxiosMiddleware,
        function (error: any) {
          return Promise.reject(error);
        }
      );
    }
  }

  public async runWorkflowFromEntity(
    input: WorkflowFromEntity
  ): Promise<RunWorkflowFromEntity> {
    const response = await this.client.mutate({
      mutation: RUN_WORKFLOW_FROM_ENTITY,
      variables: { input: input }
    });

    return response.data;
  }
}
