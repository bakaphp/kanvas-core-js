import { DocumentNode } from '@apollo/client/core';
import { ClientType } from '../../index';

export abstract class Base {
  constructor(protected client: ClientType) {}
}

export class ComposableCrud extends Base {
  constructor(protected client: ClientType) {
    super(client);
  }

  async all<TResponse>(query: DocumentNode): Promise<TResponse[]> {
    const response = await this.client.query<TResponse[]>({
      query: query,
      fetchPolicy: 'no-cache',
    });

    return response.data;
  }

  async update<TData>(variables: TData, mutation: DocumentNode): Promise<TData> {
    const response = await this.client.mutate<TData>({
      mutation,
      variables: variables as any,
    });

    return response.data!;
  }

  async handle<TResponse, TData>(variables: TData, mutation: DocumentNode): Promise<TResponse> {
    const response = await this.client.mutate<TResponse>({
      mutation,
      variables: variables as any,
    });

    return response.data!;
  }
  
}