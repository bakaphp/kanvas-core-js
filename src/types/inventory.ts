import { PaginatorInfo } from './paginator';

export interface ProductAttributes {
  name: string;
  value: string;
}

export interface ProductCompany {
  id: string;
  name: string;
}
export interface StatusReferenceInput {
  id: string;
  name?: string;
}

export interface ProductWarehouse {
  id: number;
  name: string;
  regions: {
    id: number;
    name: string;
  };
}
export interface StatusInterface {
  id: string;
  name: string;
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

export interface RegionsInterface {
  id: number;
  companies_id: number;
  currency_id: number;
  uuid: string;
  name: string;
  slug: string;
  short_slug: string;
  settings: string;
  is_default: boolean;
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
export interface VariantInterface {
  id: string;
  products_id: number;
  slug: string;
  name: string;
  description?: string;
  short_description: string;
  html_description: string;
  status: StatusInterface;
  sku: string;
  ean: string;
  files?: []; // Filesystem[];
  warehouses: {
    id: string;
    warehouseinfo: {
      id: number;
      name: string;
    };
  }[];
  attributes?: ProductAttributes[];
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
  variants: VariantInterface[];
  attributes: AttributesInterface[];
  productsTypes: ProductTypeInterface;
  companies: ProductCompany;
}

export interface InputProductParams {
  id: number;
  input: {
    products_types_id?: number;
    name?: string;
    description?: string;
    short_description?: string;
    html_description?: string;
    warranty_terms?: string;
    upc?: string;
    is_published?: boolean;
  };
}

export interface InputVariantParams {
  id: string | number;
  input: {
    products_id: number;
    name?: string;
    description?: string;
    short_description?: string;
    files?: []; // Filesystem[];
    status?: StatusReferenceInput;
    sku?: string;
    ean?: string;
    barcode?: string;
    attributes?: {
      name: string;
      value?: string | number; //Mixed
    }[];
    warehouse?: {
      id: number;
    };
    serial_number?: string;
    is_published?: boolean;
  };
}

export interface ProductVariant {
  name: string;
  description: string;
  status?: {
    id: number;
    name?: string;
  };
  sku?: string;
  ean?: string;
  barcode?: string;
  warehouse: {
    id: number;
  };
  attributes?: ProductAttributes[];
}

export interface CreateProductParams {
  products_types_id: number | null;
  name: string;
  description: string;
  short_description?: string;
  html_description?: string;
  slug?: string;
  is_published?: boolean;
  warranty_terms?: string;
  upc?: string;
  warehouses?: number[];
  categories?: number[];
  variants?: ProductVariant[];
  price?: number;
}

export interface CreatedProduct {
  products: {
    data: ProductInterface[];
    paginatorInfo?: PaginatorInfo;
  };

}

export interface CreatedProductTypes {
  productTypes: {
    data: ProductTypeInterface[];
  };
}

export interface UpdatedVariant {
  products: {
    updateVariant: VariantInterface;
  };
}

export interface UpdatedProduct {
  data: {
    updateProduct: ProductInterface;
  };
}

export interface CreatedStatus {
  getStatus: {
    data: StatusInterface[];
  };
}

export interface CreatedrRegions {
  regions: {
    data: RegionsInterface[];
  };
}

export interface DeleteProduct {
  deleteProduct: boolean;
}
