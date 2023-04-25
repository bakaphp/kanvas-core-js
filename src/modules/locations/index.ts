import { StateResponse, CountriesResponse } from 'types/locations';
import { ClientType } from '../../index';
import { COUNTRIES_QUERY, GET_STATES_BY_COUNTRY_QUERY } from '../../queries';

export class Locations {
  constructor(protected client: ClientType) {}

  public async getAllCountries(): Promise<CountriesResponse> {
    const response = await this.client.query({
      query: COUNTRIES_QUERY,
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
}
