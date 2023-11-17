import { PaginatorInfo } from './paginator';

export interface ProductAttributes {
  name: string;
  value: string;
}

export interface ProductCompany {
  id: string;
  name: string;
  user: {
    firstname: string;
    lastname: string;
  };
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
  is_default?: boolean;
  slug: string;
}

export interface OrderBy {
  column: string;
  order: 'ASC' | 'DESC';
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
  uuid: string;
  name: string;
  location: string;
  is_default: boolean;
  is_published: number;
  regions: {
    id: number;
    name: string;
  };
}
export interface VariantInterface {
  id: string;
  products_id: number;
  slug: string;
  name: string;
  user_interactions: any;
  description?: string;
  short_description: string;
  html_description: string;
  status: StatusInterface;
  sku: string;
  ean: string;
  warehouses: {
    warehouses_id: string;
    status_history?: {
      id: string | number;
      name: string;
      from_date: string;
    }[];
    channels: {
      name: string;
      price: number;
      is_published: boolean;
    }[];
    warehouseinfo: {
      id: number;
      name: string;
    };
  }[];
  attributes?: ProductAttributes[];
  product: ProductInterface;
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

export interface FilesystemInterface {
  id: number | string;
  uuid: string;
  name: string;
  url: string;
  type: string;
  size: number;
  field_name: string;
  attributes: any;
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
  files: {
    data: FilesystemInterface[];
  };
  categories: CategoryInterface[];
  warehouses: ProductWarehouse[];
  variants: VariantInterface[];
  attributes: ProductAttributes[];
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
      warehouse_id: number;
      status?: {
        id: number | string;
      };
    };
    serial_number?: string;
    is_published?: boolean;
  };
}

export interface InputVariantWarehouseParams {
  id: string | number;
  input: {
    warehouses_id: string | number;
    status?: {
      id: string;
    };
    quantity?: number;
    price?: number;
    sku?: string;
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
  warehouse?: {
    id: number;
    status?: {
      id: number | string;
    };
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
  attributes?: ProductAttributes[];
  company_id?: number | string;
}

export interface AllCreatedProducts {
  products: {
    data: ProductInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}

export interface AllCreatedVariants {
  variants: {
    data: VariantInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}

export interface AllCreatedVariantsbyStatus {
  variantsByStatus: {
    data: VariantInterface[];
    paginatorInfo?: PaginatorInfo;
  };
}

export interface CreatedProduct {
  createProduct: ProductInterface;
}

export interface CreatedStatus {
  createStatus: StatusInterface;
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

export interface UpdatedVariantWarehouse {
  updateVariantInWarehouse: VariantInterface;
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

export interface CreatedWarehouses {
  getWarehouses: {
    data: WarehouseInterface[];
  };
}

export interface CreatedAttributes {
  attributes: {
    data: AttributesInterface[];
  };
}

export interface DeleteProduct {
  deleteProduct: boolean;
}

export interface ProductDashboardInterface {
  productDashboard: {
    total_products: number;
    total_variants: number;
    product_status: {
      status_id: number | string;
      status_name: string;
      warehouses_name: string;
      warehouses_id: number | string;
      total_amount: number;
    }[];
  };
}

export interface deleteVariant {
  deleteVariant: boolean;
}

export interface InputStatusParams {
  name: string;
  is_default?: boolean;
  company_id?: number | number;
}

export interface ProductAdminDashboardInterface {
  productAdminDashboard: {
    total_products: number;
    total_variants: number;
    product_status: ProductAdminStatusDashboard[];
  };
}

export interface ProductAdminStatusDashboard {
  status_id: number | string;
  status_name: string;
  status_slug: string;
  total_amount: number;
}
