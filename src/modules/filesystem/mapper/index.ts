import { FILESYSTEM } from '../../../types/filesystem';
import {
  CREATE_FILESYSTEM_MAPPER_MUTATION,
  FILESYSTEM_IMPORT_MUTATION,
} from '../../../mutations';

import {
  FILESYSTEM_MAPPER,
  FILESYSTEM_MAPPER_INPUT,
  FILESYSTEM_IMPORT_INPUT,
  FILESYSTEM_IMPORT,
} from '../../../types/mapper';

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
}
