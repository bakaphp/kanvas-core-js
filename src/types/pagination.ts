export interface PaginationInterface {
  currentPage: number;
  lastPage: number;
}

export interface FormatedResponse<T> {
  data: T[];
  paginatorInfo: PaginationInterface;
}