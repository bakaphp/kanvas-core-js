import { DocumentNode } from '@apollo/client/core';
import { ClientType } from '../../index';

export abstract class Base {
  constructor(protected client: ClientType) {}
}

interface Options {
  get: DocumentNode;
  create: DocumentNode;
  update: DocumentNode;
  remove: DocumentNode;
}

export class BaseCrud<TBase, TMutate, TDelete> extends Base {
  constructor(protected client: ClientType, protected options: Options) {
    super(client);
  }

  async all(): Promise<TBase[]> {
    const response = await this.client.query<TBase[]>({
      query: this.options.get,
      fetchPolicy: 'no-cache',
    });

    return response.data;
  }

  async create(data: Omit<TMutate, 'id'>): Promise<TBase> {
    const response = await this.client.mutate<TBase>({
      mutation: this.options.create,
      variables: { ...data },
    });

    return response.data!;
  }

  async update(data: TMutate): Promise<TBase> {
    const response = await this.client.mutate<TBase>({
      mutation: this.options.create,
      variables: { ...data as any },
    });

    return response.data!;
  }

  async remove(data: TDelete) {
    await this.client.mutate({
      mutation: this.options.remove,
      variables: { ...data as any }
    })
  }
}