export interface Location {
    id: number;
    name: string;
    code: string;
    flag?: string;
}

export interface City {
    id: number;
    name: string;
    latitude?: number;
    longitude?: number;
    states_id?: number;
    countries_id: number;
}

export interface State extends Location {
    cities?: City[];
}

export interface Country extends Location {
    states?: State[];
}

export interface PaginatorInfo {
    currentPage: number;
    perPage: number;
    firstItem: number;
    lastItem: number;
    total: number;
    count: number;
    lastPage: number;
    hasMorePages: boolean;
}

export interface CountriesResponse {
    countries: {
        data: Country[];
        paginatorInfo: PaginatorInfo;
    };
}

export interface StatesResponse {
    states: {
        data: State[];
        paginatorInfo: PaginatorInfo;
    };
}

export interface StatesByCountryResponse {
    countries: {
        data: Array<{
            id: number;
            states: State[];
        }>;
    };
}

export interface GetLocationsInput {
    first?: number;
    page?: number;
    where?: WhereCondition;
    orderBy?: OrderBy[];
    search?: string;
}

export interface WhereCondition {
    column: string;
    operator: string;
    value: any;
    AND?: WhereCondition[];
    OR?: WhereCondition[];
}

export interface OrderBy {
    column: string;
    order: "ASC" | "DESC";
}
