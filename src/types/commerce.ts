export interface CartItemInput {
  input: {
    quantity: number;
    variant_id: number;
  }[];
}

export interface CartItemData {
  data: {
    addToCart: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[];
  };
}
