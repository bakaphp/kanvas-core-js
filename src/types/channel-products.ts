import { VariantInterface } from './inventory';

export interface ChannelProductsInterface {
  id: string;
  uuid: string;
  name: string;
  description: string;
  variants?: VariantInterface[];
  attributes: {
    slug: string;
    name: string;
    value: string;
  }
}
