import { DocumentNode } from '@apollo/client/core';
import { ClientType } from '../../index';

export abstract class Base {
  constructor(protected client: ClientType) {}
}

export class ComposableCrud extends Base {
  constructor(protected client: ClientType) {
    super(client);
  }

  /**
   * get all the properties of a entity
   * @param query GQL query to be send into GraphQL
   * @returns generic response
   */
  async all<TResponse>(query: DocumentNode): Promise<TResponse[]> {
    const response = await this.client.query<TResponse[]>({
      query: query,
      fetchPolicy: 'no-cache',
    });

    return response.data;
  }

  /**
   * updates a entity base on the given properties
   * @param variables generic data to update the entity
   * @param mutation GQL mutation to be send into Graphql
   * @returns generic response base on TData
   */
  async update<TData>(variables: TData, mutation: DocumentNode): Promise<TData> {
    const response = await this.client.mutate<TData>({
      mutation,
      variables: variables as any,
    });

    return response.data!;
  }

  /**
   * mutate a entity by the given variables and GQL mutation
   * @param variables generic data to mutate the entity the entity
   * @param mutation GQL mutation to be send into Graphql
   * @returns 
   */
  async handle<TResponse, TData>(variables: TData, mutation: DocumentNode): Promise<TResponse> {
    const response = await this.client.mutate<TResponse>({
      mutation,
      variables: variables as any,
    });

    return response.data!;
  }
  
}