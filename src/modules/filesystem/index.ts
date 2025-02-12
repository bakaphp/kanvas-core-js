import axios from 'axios';
import FormData from 'form-data';
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
  FILESYSTEM_ATTACH_INPUT,
  UserData,
  CompanyInterface,
  UPLOAD_CSV_INTERFACE,
} from '../../types';
import {
  ATTACH_FILE_MUTATION,
  DETACH_FILES_MUTATION,
  DETACH_FILE_MUTATION,
} from '../../mutations';
import { ENTITY_FILES_QUERY } from '../../queries';
import { ClientType } from './../../index';
export { FilesystemMapper } from './mapper/index';
export class FileSystem {
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
        function(error: any) {
          return Promise.reject(error);
        }
      );
    }
  }

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
    return response.data.entityFiles.data as FILESYSTEM[];
  }

  public async attachFile(input: FILESYSTEM_ATTACH_INPUT): Promise<string> {
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
      mutation: DETACH_FILES_MUTATION,
      variables: { uuids: uuids },
    });
    return response.data.deAttachFiles as boolean;
  }

  public async uploadFile(data: File): Promise<UPLOAD_INTERFACE> {
    if (!this.options || !this.axiosClient)
      throw new Error('FileSystem module not initialized');

    const formData = new FormData();
    formData.append(
      'operations',
      JSON.stringify({
        query:
          'mutation ($file: Upload!) { upload(file: $file) {id, uuid, name, url } }',
        variables: {
          file: null,
        },
      })
    );
    formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
    formData.append('0', data, data.name);
    let response = await this.axiosClient.post('', formData);

    return response.data.data.upload as UPLOAD_INTERFACE;
  }

  /**
   * Uploads a CSV file to the server.
   * @param data The file to upload (File in browser, Buffer in Node.js)
   * @returns Promise resolving to the upload result
   * @throws Error if the module is not initialized or if the input is invalid
   */
  public async uploadFileCsv(
    data: File | Buffer
  ): Promise<UPLOAD_CSV_INTERFACE> {
    if (!this.options || !this.axiosClient) {
      throw new Error('FileSystem module not initialized');
    }

    const isBrowser = typeof window !== 'undefined';
    let formData: FormData = new FormData();

    if (isBrowser) {
      formData.append('0', data as File, (data as File).name);
    } else {
      // Node.js environment
      if (!Buffer.isBuffer(data)) {
        throw new Error('Expected a Buffer in Node.js');
      }
      formData.append('0', data, { filename: 'uploaded_file.csv' });
    }

    // Append GraphQL mutation data
    formData.append(
      'operations',
      JSON.stringify({
        query: 'mutation ($file: Upload!) { uploadCsv(file: $file) }',
        variables: { file: null },
      })
    );
    formData.append('map', JSON.stringify({ '0': ['variables.file'] }));

    // Make the API request
    const headers = isBrowser ? {} : (formData as any).getHeaders();
    const response = await this.axiosClient.post('', formData, { headers });

    return response.data.data;
  }
  public async updatePhotoProfile(
    data: File,
    users_id: string
  ): Promise<UserData> {
    if (!this.options || !this.axiosClient)
      throw new Error('FileSystem module not initialized');
    let query = `      
      id
      uuid
      firstname
      lastname
      displayname
      description
      default_company
      default_company_branch
      email
      mainRole
      branches {
        id
        name
        phone
      }
      companies {
        id
        name
        uuid
      }
      contact {
        phone_number
        cell_phone_number
      }
      social {
        total_followers
        total_following
      }
      roles
      abilities
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
      }`;
    const formData = new FormData();
    formData.append(
      'operations',
      JSON.stringify({
        query:
          'mutation ($file: Upload!) { updatePhotoProfile(file: $file, user_id:"' +
          users_id +
          '") {' +
          query +
          '} }',
        variables: {
          file: null,
        },
      })
    );
    formData.append(
      'map',
      JSON.stringify({ '0': ['variables.file'], '1': ['variables.user_id'] })
    );
    formData.append('0', data, data.name);
    formData.append('1', users_id);
    let response = await this.axiosClient.post('', formData);
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    return response.data.data.updatePhotoProfile as UserData;
  }

  public async updateCompanyPhotoProfile(
    data: File,
    company_id: string
  ): Promise<CompanyInterface> {
    if (!this.options || !this.axiosClient)
      throw new Error('FileSystem module not initialized');
    let query = `      
    id
    uuid
    name
    custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
      data {
        name
        value
      }
    }
    photo {
      url
    }`;

    const formData = new FormData();
    formData.append(
      'operations',
      JSON.stringify({
        query:
          'mutation ($file: Upload!) { updateCompanyPhotoProfile(file: $file, id:"' +
          company_id +
          '") {' +
          query +
          '} }',
        variables: {
          file: null,
        },
      })
    );
    formData.append(
      'map',
      JSON.stringify({ '0': ['variables.file'], '1': ['variables.id'] })
    );
    formData.append('0', data, data.name);
    formData.append('1', company_id);
    let response = await this.axiosClient.post('', formData);
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    return response.data.data.updateCompanyPhotoProfile as CompanyInterface;
  }

  public async updateCompanyBranchPhotoProfile(
    data: File,
    branch_id: string
  ): Promise<any> {
    if (!this.options || !this.axiosClient) {
      throw new Error('FileSystem module not initialized');
    }

    const query = `
      id
      uuid
      name
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
      }
    `;

    const operations = {
      query: `mutation ($file: Upload!) {
        updatePhotoProfileToCompanyBranch(file: $file, id: "${branch_id}") { ${query} }
      }`,
      variables: { file: null },
    };

    const formData = new FormData();
    formData.append('operations', JSON.stringify(operations));
    formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
    formData.append('0', data, data.name);

    const response = await this.axiosClient.post('', formData);

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    return response.data;
  }
}
