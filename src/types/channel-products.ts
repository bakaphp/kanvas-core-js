import { VariantInterface } from './inventory';

export type ChannelProductsInterface = {
  id: string;
  name: string;
  description: string;
  variants?: VariantInterface[];
};
