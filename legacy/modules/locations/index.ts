import { StateResponse, CountriesResponse } from 'types/locations';
import { ClientType, OrderBy, WhereCondition } from '../../__index';
import {
  COUNTRIES_QUERY,
  GET_STATES,
  GET_STATES_BY_COUNTRY_QUERY,
} from '../../queries';

export class Locations {
  constructor(protected client: ClientType) {}

  public async getAllCountries(
    options: {
      first?: number;
      page?: number;
      where?: WhereCondition;
      orderBy?: OrderBy[];
      search?: string;
    } = {}
  ): Promise<CountriesResponse> {
    const { first, page, where, orderBy, search } = options;

    const response = await this.client.query({
      query: COUNTRIES_QUERY,
      variables: { where, first, page, orderBy, search },
    });
    return response.data;
  }

  public async getStatesByCountry(id: number): Promise<StateResponse> {
    const response = await this.client.query({
      query: GET_STATES_BY_COUNTRY_QUERY,
      variables: {
        first: 100,
        where: {
          column: 'ID',
          operator: 'EQ',
          value: id,
        },
      },
    });
    return response.data.countries;
  }

  public async getStates(
    options: {
      first?: number;
      page?: number;
      where?: WhereCondition;
      orderBy?: OrderBy[];
      search?: string;
    } = {}
  ): Promise<StateResponse> {
    const { first, page, where, orderBy, search } = options;

    const response = await this.client.query({
      query: GET_STATES,
      variables: { where, first, page, orderBy, search },
    });
    return response.data;
  }
}
