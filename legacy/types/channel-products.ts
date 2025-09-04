import { ProductInterface } from "./inventory";
import { PaginatorInfo } from "./paginator";
import { WhereCondition } from "./index";

export type ChannelProductsProps = {
  id: string;
  first: number;
  whereCondition: WhereCondition;
  page: number;
};
export interface ChannelProductsInterface {
  data: ProductInterface[];
  paginatorInfo?: PaginatorInfo;
}
