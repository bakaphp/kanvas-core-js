export interface ResponseSDK<T extends any> {
  __typename: string;
  data: T;
  paginatorInfo: { __typename: string; currentPage: number; lastPage: number };
}
