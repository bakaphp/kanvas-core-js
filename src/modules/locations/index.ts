import { countriesResponse, stateResponse } from 'types/locations';
import { ClientType } from '../../index';
import { COUNTRIES_QUERY, GET_STATES_BY_COUNTRY_QUERY } from '../../queries';

export class Locations {
  constructor(protected client: ClientType) {}

  public async getAllCountries() {
    const response = await this.client.query({
      query: COUNTRIES_QUERY,
    });
    return response.data.countries as countriesResponse;
  }

  public async getStatesByCountry(id: number) {
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
    return response.data.countries as stateResponse;
  }
}
