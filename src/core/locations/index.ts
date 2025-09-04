import {
  COUNTRIES_QUERY,
  GET_STATES,
  GET_STATES_BY_COUNTRY_QUERY,
} from "@/graphql/locations.query";

import { GetLocationsInput, WhereCondition } from "@/types/locations";
import { Client } from "@/types/app";

class Locations {
  #client: Client;

  constructor(client: Client) {
    this.#client = client;
  }

  /**
   * Get all countries with pagination and filtering
   */
  public async getAllCountries(
    options: GetLocationsInput = {},
  ) {
    const { first, page, where, orderBy, search } = options;

    const response = await this.#client.query({
      query: COUNTRIES_QUERY,
      variables: { where, first, page, orderBy, search },
      fetchPolicy: "no-cache",
    });

    return response;
  }

  /**
   * Get a specific country by ID
   */
  public async getCountryById(id: number) {
    const where: WhereCondition = {
      column: "ID",
      operator: "EQ",
      value: id,
    };

    return this.getAllCountries({ where, first: 1 });
  }

  /**
   * Get states by country ID
   */
  public async getStatesByCountry(
    countryId: number,
  ) {
    const where: WhereCondition = {
      column: "ID",
      operator: "EQ",
      value: countryId,
    };

    const response = await this.#client.query({
      query: GET_STATES_BY_COUNTRY_QUERY,
      variables: {
        first: 100,
        where,
      },
      fetchPolicy: "no-cache",
    });

    return response;
  }

  /**
   * Get all states with pagination and filtering
   */
  public async getStates(
    options: GetLocationsInput = {},
  ) {
    const { first, page, where, orderBy, search } = options;

    const response = await this.#client.query({
      query: GET_STATES,
      variables: { where, first, page, orderBy, search },
      fetchPolicy: "no-cache",
    });

    return response;
  }

  /**
   * Get states by country code
   */
  public async getStatesByCountryCode(
    countryCode: string,
  ) {
    // First, get the country by code
    const countryWhere: WhereCondition = {
      column: "CODE",
      operator: "EQ",
      value: countryCode.toUpperCase(),
    };

    const countryResponse = await this.getAllCountries({
      where: countryWhere,
      first: 1,
    });

    //@ts-expect-error
    if (countryResponse.data.countries.data.length === 0) {
      return {
        states: {
          data: [],
          paginatorInfo: {
            currentPage: 1,
            perPage: 0,
            firstItem: 0,
            lastItem: 0,
            total: 0,
            count: 0,
            lastPage: 1,
            hasMorePages: false,
          },
        },
      };
    }

    //@ts-expect-error
    const countryId = countryResponse.data.countries.data[0].id;
    const statesResponse = await this.getStatesByCountry(countryId);

    //@ts-expect-error
    if (statesResponse.data.countries.data.length === 0) {
      return {
        states: {
          data: [],
          paginatorInfo: {
            currentPage: 1,
            perPage: 0,
            firstItem: 0,
            lastItem: 0,
            total: 0,
            count: 0,
            lastPage: 1,
            hasMorePages: false,
          },
        },
      };
    }

    //@ts-expect-error
    const states = statesResponse.data.countries.data[0].states || [];

    return {
      states: {
        data: states,
        paginatorInfo: {
          currentPage: 1,
          perPage: states.length,
          firstItem: states.length > 0 ? 1 : 0,
          lastItem: states.length,
          total: states.length,
          count: states.length,
          lastPage: 1,
          hasMorePages: false,
        },
      },
    };
  }

  /**
   * Search countries by name
   */
  public async searchCountriesByName(
    searchTerm: string,
    limit: number = 10,
  ) {
    return this.getAllCountries({
      search: searchTerm,
      first: limit,
    });
  }

  /**
   * Search states by name
   */
  public async searchStatesByName(
    searchTerm: string,
    limit: number = 10,
  ) {
    return this.getStates({
      search: searchTerm,
      first: limit,
    });
  }

  /**
   * Get countries by region (using flag prefix or custom logic)
   */
  public async getCountriesByRegion(
    region: string,
  ) {
    // You can implement custom logic here based on your needs
    // For example, filtering by continent or region codes
    return this.getAllCountries({
      search: region,
      first: 100,
    });
  }
}

/**
 * Create a Locations instance
 */
export function createLocations(client: Client) {
  return new Locations(client);
}

// Re-export types for convenience
export type {
  City,
  CountriesResponse,
  Country,
  GetLocationsInput,
  Location,
  OrderBy,
  PaginatorInfo,
  State,
  StatesByCountryResponse,
  StatesResponse,
  WhereCondition,
} from "@/types/locations";
