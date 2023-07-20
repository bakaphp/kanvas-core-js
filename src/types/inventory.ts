export interface ProductInterface  {
    id: number;
    uuid: string;
    name: string;
    description: string;
    short_description: string;
    slug: string;
    variants: {
        name: string;
        description: string;
        slug: string;
        attributes: {
            name: string;
            value: string;
        }[];
    }[];
}


export interface CreateProductParams {
    name: string;
    description: string;
    short_description: string;
    slug: string;
    variants: {
        name: string;
        warehouse_id: number;
        description: string;
        slug: string;
        attributes: {
            name: string;
            value: string;
        }[];
    };
}

export interface CreatedProduct {
    product: ProductInterface;
  }