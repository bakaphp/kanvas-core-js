import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});

describe('Test the Commerce', () => {
    it('add to cart', async () => {
        const client = getClient();
        const addToCart = await client.cart.addToCart([
            {
                quantity: 1,
                variant_id: 13857, // Pass this as a number if the schema expects it as Int!
            },
        ]);

        expect(addToCart).toBeDefined();
        expect(addToCart.addToCart[0].id).toBeDefined();
    });

    it('get cart', async () => {
        const client = getClient();
        const cart = client.cart;
        const getCart = await cart.getCart();

        expect(getCart).toBeDefined();
        expect(getCart.cart.id).toBeDefined();
        expect(getCart.cart.items).toBeInstanceOf(Array);
    });
});