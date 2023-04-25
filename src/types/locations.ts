interface Location {
  id: number;
  name: string;
}

interface Country extends Location {
  states: Array<State>;
}

interface State extends Location {
  cities: Array<City>;
}

interface City extends Location {
  country_id: number;
}

export interface countriesResponse {
  data: Array<Country>;
}

export interface stateResponse {
  data: Array<State>;
}
