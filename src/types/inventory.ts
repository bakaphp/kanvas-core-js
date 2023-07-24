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
  is_published: boolean;
  variants: ProductVariant[];
}

export interface CreateProductVariant extends ProductVariant {
  warehouse_id: number;
}

export interface CreateProductParams {
  id:number;
  products_types_id: number;
  name: string;
  description: string;
  short_description: string;
  slug: string;
  is_published: boolean;
  warranty_terms: string;
  upc: string;
  warehouses: number[];
  categories: number[];
  variants: CreateProductVariant[];
}

export interface CreatedProduct {
  product: ProductInterface;
}
