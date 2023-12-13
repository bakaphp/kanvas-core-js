import axios from 'axios';
import FormData from 'form-data';
import { ClientType } from './../../index';
interface Options {
  url: string;
  key: string;
  adminKey?: string;
  authAxiosMiddleware?: any;
}
import {
  UPLOAD_INTERFACE,
  FILESYSTEM,
  SystemModuleEntityInput,
  WhereCondition,
} from '../../types';
import { ATTACH_FILE_MUTATION, DETACH_FILE_MUTATION } from '../../mutations';
import { ENTITY_FILES_QUERY } from '../../queries';

export class FileSystem {
  constructor(protected client: ClientType, protected options?: Options) {}

  public async getEntityFiles(
    entity: SystemModuleEntityInput,
    where?: WhereCondition,
    first?: number,
    page?: number
  ): Promise<FILESYSTEM[]> {
    const response = await this.client.query({
      query: ENTITY_FILES_QUERY,
      variables: { entity, where, first, page },
    });
    return response.data.entityFiles as FILESYSTEM[];
  }

  public async attachFile(input: UPLOAD_INTERFACE): Promise<string> {
    const response = await this.client.mutate({
      mutation: ATTACH_FILE_MUTATION,
      variables: { input: input },
    });
    return response.data.attachFile as string;
  }

  public async detachFile(uuid: string): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: DETACH_FILE_MUTATION,
      variables: { uuid: uuid },
    });
    return response.data.deAttachFile as boolean;
  }

  public async detachFiles(uuids: string[]): Promise<boolean> {
    const response = await this.client.mutate({
      mutation: DETACH_FILE_MUTATION,
      variables: { uuids: uuids },
    });
    return response.data.deAttachFiles as boolean;
  }

  public async uploadFile(data: any): Promise<UPLOAD_INTERFACE> {
    if (!this.options) throw new Error('FileSystem module not initialized');
    axios.create({
      baseURL: this.options.url,
      headers: {
        'X-Kanvas-App': this.options.key,
        ...(this.options.adminKey && { 'X-Kanvas-Key': this.options.adminKey }),
      },
    });

    axios.interceptors.request.use(this.options.authAxiosMiddleware, function(
      error: any
    ) {
      return Promise.reject(error);
    });
    const formData = new FormData();
    formData.append(
      'operations',
      '{ "query": "mutation ($file: Upload!) { upload(file: $file) {id, uuid, name, url } }"}'
    );
    formData.append('map', '{"0": ["variables.file"]}');
    formData.append('0', data);
    let response = await axios.post('/graphql', formData);
    return response.data.data.upload as UPLOAD_INTERFACE;
  }
}
