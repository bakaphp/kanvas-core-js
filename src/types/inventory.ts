export interface ProductAttributes {
  name: string;
  value: string;
}

export interface ProductCompany {
  id: string;
  name: string;
}

export interface ProductWarehouse {
  id: number;
  name: string;
  regions: {
    id: number;
    name: string;
  };
}

export interface ProductVariant {
  name: string;
  description: string;
  slug: string;
  attributes: ProductAttributes[];
}

export interface AttributesInterface {
  id: number;
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  companies: ProductCompany[];
  values: {
    id: string;
    value: string | number; //Mixed
  }[];
}

export interface CategoryInterface {
  id: number;
  companies_id: number;
  parent_id: number;
  uuid: string;
  name: string;
  slug: string;
  code: string;
  position: number;
  is_published: boolean;
  companies: ProductCompany;
}

export interface WarehouseInterface {
  id: number;
  apps_id: number;
  regions_id: number;
  companies_id: number;
  uuid: string;
  name: string;
  location: string;
  is_default: boolean;
  is_published: number;
}

export interface ProductTypeInterface {
  id: number;
  companies_id: number;
  uuid: string;
  name: string;
  description: string;
  slug: string;
  weight: number;
  companies: ProductCompany;
}

export interface ProductInterface {
  id: number;
  products_types_id: number;
  uuid: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  html_description: string;
  warranty_terms: string;
  upc: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  files: []; // Filesystem[];
  categories: CategoryInterface[];
  warehouses: ProductWarehouse[];
  variants: ProductVariant[];
  attributes: AttributesInterface[];
  productsTypes: ProductTypeInterface;
  companies: ProductCompany;
}

export interface CreateProductVariant extends ProductVariant {
  warehouse_id: number;
}

export interface CreateProductParams {
  products_types_id?: number;
  name: string;
  description: string;
  short_description?: string;
  slug?: string;
  is_published?: boolean;
  warranty_terms?: string;
  upc?: string;
  warehouses?: number[];
  categories?: number[];
  variants?: CreateProductVariant[];
  price?: number;
}

export interface CreatedProduct {
  products: ProductInterface;
}

export interface CreatedProductTypes {
  productTypes: ProductTypeInterface;
}
