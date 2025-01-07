import { VariantInterface } from './inventory';

export interface ChannelProductsInterface {
  id: string;
  name: string;
  description: string;
  variants?: VariantInterface[];
}
