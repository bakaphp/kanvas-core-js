interface Location {
  id: number;
  name: string;
  code: string;
}

interface Country extends Location {
  states: Array<State>;
}

interface State extends Location {
  cities: Array<City>;
}

interface City extends Omit<Location, 'code'> {
  country_id: number;
}

export interface CountriesResponse {
  data: Array<Country>;
  paginatorInfo: Record<string, number>;
}

export interface StateResponse {
  data: Array<State>;
}
