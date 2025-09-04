import {
    ADD_TO_CART_MUTATION,
    CART_DISCOUNT_CODES_UPDATE,
    CLEAR_CART_MUTATION,
} from "@/graphql/commerce.mutation";

import { GET_CART_QUERY } from "@/graphql/commerce.query";
import { CartItemInput } from "@/types/commerce";
import { Client } from "@/types/app";

class Cart {
    #apolloClient: Client;

    constructor(client: Client) {
        this.#apolloClient = client;
    }

    /**
     * Add items to cart
     */
    public async addToCart(input: CartItemInput[]) {
        const response = await this.#apolloClient.mutate({
            mutation: ADD_TO_CART_MUTATION,
            variables: { input },
        });

        return response;
    }

    /**
     * Clear all items from cart
     */
    public async clearCart() {
        const response = await this.#apolloClient.mutate({
            mutation: CLEAR_CART_MUTATION,
        });

        return response;
    }

    /**
     * Get current cart
     */
    public async getCart() {
        const response = await this.#apolloClient.query({
            query: GET_CART_QUERY,
            fetchPolicy: "no-cache",
        });

        return response;
    }

    /**
     * Update discount codes in cart
     */
    public async updateDiscountCodes(
        discountCodes: string[],
    ) {
        const response = await this.#apolloClient.mutate({
            mutation: CART_DISCOUNT_CODES_UPDATE,
            variables: { discountCodes },
        });

        return response;
    }
}

/**
 * Create a Cart instance
 */
export function createCart(client: Client) {
    return new Cart(client);
}
