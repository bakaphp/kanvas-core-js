import { VariantInterface } from './inventory';

export interface ChannelProductsInterface {
  id: string;
  name: string;
  description: string;
  variants?: VariantInterface[];
  attributes: {
    name: string;
    value: string;
  }
}
