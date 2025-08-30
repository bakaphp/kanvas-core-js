import {
  CREATE_FILESYSTEM_MAPPER_MUTATION,
  DELETE_FILESYSTEM_MAPPER_MUTATION,
  FILESYSTEM_IMPORT_MUTATION,
  UPDATE_FILESYSTEM_MAPPER_MUTATION,
} from "../../../mutations";

import {
  FILESYSTEM_IMPORT,
  FILESYSTEM_IMPORT_INPUT,
  FILESYSTEM_MAPPER,
  FILESYSTEM_MAPPER_INPUT,
  UpdateFilesystemMapperInput,
  WhereCondition,
} from "../../../types";

import { FILESYSTEM_MAPPER_QUERY } from "../../../queries";

export class FilesystemMapper {
  constructor(private client: any) {}

  public async createFilesystemMapper(
    input: FILESYSTEM_MAPPER_INPUT,
  ): Promise<FILESYSTEM_MAPPER> {
    const { data } = await this.client.mutate({
      mutation: CREATE_FILESYSTEM_MAPPER_MUTATION,
      variables: {
        input,
      },
    });

    return data.createFilesystemMapper;
  }

  public async updateFilesystemMapper(
    input: UpdateFilesystemMapperInput,
  ): Promise<FILESYSTEM_MAPPER> {
    const { data } = await this.client.mutate({
      mutation: UPDATE_FILESYSTEM_MAPPER_MUTATION,
      variables: {
        input,
      },
    });

    return data.updateFilesystemMapper;
  }

  public async deleteFilesystemMapper(id: string): Promise<boolean> {
    const { data } = await this.client.mutate({
      mutation: DELETE_FILESYSTEM_MAPPER_MUTATION,
      variables: {
        id,
      },
    });

    return data.deleteFilesystemMapper as boolean;
  }

  public async filesystemImport(
    input: FILESYSTEM_IMPORT_INPUT,
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
    where: WhereCondition,
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
