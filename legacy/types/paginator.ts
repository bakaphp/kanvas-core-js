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
