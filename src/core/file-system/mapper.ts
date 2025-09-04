import {
  CREATE_FILESYSTEM_MAPPER_MUTATION,
  DELETE_FILESYSTEM_MAPPER_MUTATION,
  FILESYSTEM_IMPORT_MUTATION,
  UPDATE_FILESYSTEM_MAPPER_MUTATION,
} from "@/graphql/filesystem.mutation";

import {
  FilesystemImportInput,
  FilesystemMapperInput,
  UpdateFilesystemMapperInput,
  WhereCondition,
} from "@/types/filesystem";

import { FILESYSTEM_MAPPER_QUERY } from "@/graphql/filesystem.query";
import { Client } from "@/types/app";

class FilesystemMapper {
  #client: Client;

  constructor(client: Client) {
    this.#client = client;
  }

  /**
   * Create a new filesystem mapper
   */
  public async createFilesystemMapper(
    input: FilesystemMapperInput,
  ) {
    const { data } = await this.#client.mutate({
      mutation: CREATE_FILESYSTEM_MAPPER_MUTATION,
      variables: {
        input,
      },
    });

    return data;
  }

  /**
   * Update an existing filesystem mapper
   */
  public async updateFilesystemMapper(
    input: UpdateFilesystemMapperInput,
  ) {
    const { data } = await this.#client.mutate({
      mutation: UPDATE_FILESYSTEM_MAPPER_MUTATION,
      variables: {
        input,
      },
    });

    return data;
  }

  /**
   * Delete a filesystem mapper
   */
  public async deleteFilesystemMapper(id: string) {
    const { data } = await this.#client.mutate({
      mutation: DELETE_FILESYSTEM_MAPPER_MUTATION,
      variables: {
        id,
      },
    });

    return data;
  }

  /**
   * Import data using a filesystem mapper
   */
  public async filesystemImport(
    input: FilesystemImportInput,
  ) {
    const { data } = await this.#client.mutate({
      mutation: FILESYSTEM_IMPORT_MUTATION,
      variables: {
        input,
      },
    });

    return data;
  }

  /**
   * Get filesystem mappers with pagination and filtering
   */
  public async getFilesystemMappers(
    options: {
      page?: number;
      first?: number;
      where?: WhereCondition;
      search?: string;
    } = {},
  ) {
    const { page = 1, first = 10, where, search } = options;

    const { data } = await this.#client.query({
      query: FILESYSTEM_MAPPER_QUERY,
      variables: {
        page,
        first,
        where,
        search,
      },
      fetchPolicy: "no-cache",
    });

    return data;
  }

  /**
   * Get a single filesystem mapper by ID
   */
  public async getFilesystemMapper(
    id: string,
  ) {
    const where: WhereCondition = {
      column: "ID",
      operator: "EQ",
      value: id,
    };

    const response = await this.getFilesystemMappers({
      first: 1,
      where,
    });

    return response;
  }
}

/**
 * Create a FilesystemMapper instance
 */
export function createFilesystemMapper(client: Client) {
  return new FilesystemMapper(client);
}
