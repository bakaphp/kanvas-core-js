export interface Where {
  column: string;
  operator: 'EQ' | 'IN';
  value: string | number | string[] | number[];
}

export interface OrderBy {
  column: string;
  order: 'ASC' | 'DESC';
}

export interface Query {
  first?: number;
  where?: Where;
  orderBy?: OrderBy;
}

export interface QueryWithPagination extends Query {
  page?: number;
}

export interface BaseInterface {
  id: number;
  created_at: string;
  updated_at: string;
}