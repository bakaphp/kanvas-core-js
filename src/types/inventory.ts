export interface ProductAttributes {
  name: string;
  value: string;
}

export interface ProductVariant {
  name: string;
  description: string;
  slug: string;
  attributes: ProductAttributes[];
}

export interface ProductInterface {
  id: number;
  uuid: string;
  name: string;
  description: string;
  short_description: string;
  slug: string;
  variants: ProductVariant[];
}

export interface CreateProductVariant extends ProductVariant {
  warehouse_id: number;
}

export interface CreateProductParams {
  name: string;
  description: string;
  short_description: string;
  slug: string;
  variants: CreateProductVariant[];
}

export interface CreatedProduct {
  product: ProductInterface;
}
