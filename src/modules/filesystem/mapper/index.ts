import {
  CREATE_FILESYSTEM_MAPPER_MUTATION,
  FILESYSTEM_IMPORT_MUTATION,
} from '../../../mutations';

import {
  FILESYSTEM_MAPPER,
  FILESYSTEM_MAPPER_INPUT,
  FILESYSTEM_IMPORT_INPUT,
  FILESYSTEM_IMPORT,
  WhereCondition,
} from '../../../types';

import { FILESYSTEM_MAPPER_QUERY } from '../../../queries';

export class FilesystemMapper {
  constructor(private client: any) {}

  public async createFilesystemMapper(
    input: FILESYSTEM_MAPPER_INPUT
  ): Promise<FILESYSTEM_MAPPER> {
    const { data } = await this.client.mutate({
      mutation: CREATE_FILESYSTEM_MAPPER_MUTATION,
      variables: {
        input,
      },
    });

    return data.createFilesystemMapper;
  }

  public async filesystemImport(
    input: FILESYSTEM_IMPORT_INPUT
  ): Promise<FILESYSTEM_IMPORT> {
    const { data } = await this.client.mutate({
      mutation: FILESYSTEM_IMPORT_MUTATION,
      variables: {
        input,
      },
    });

    return data.filesystemImport;
  }

  public async getFilesystemMapper(
    page: number,
    first: number,
    where: WhereCondition
  ): Promise<{ data: FILESYSTEM_MAPPER[]; paginatorInfo: any }> {
    const { data } = await this.client.query({
      query: FILESYSTEM_MAPPER_QUERY,
      variables: {
        page,
        first,
        where,
      },
    });
    return data.filesystemMappers;
  }
}
