import { PaginatorInfo } from "./paginator";

interface Location {
  id: number;
  name: string;
  code: string;
}

export interface Country extends Location {
  states: Array<State>;
}

interface State extends Location {
  cities: Array<City>;
}

interface City extends Omit<Location, 'code'> {
  country_id: number;
}

export interface CountriesResponse {
  countries: {
    data:Location[];
    paginatorInfo: PaginatorInfo
  }

}

export interface StateResponse {
  data: Array<State>;
}
