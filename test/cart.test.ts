import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});

describe('Test the Commerce', () => {
    it('get cart', async () => {
        const client = getClient();
        const cart = client.cart;
        const getCart = await cart.getCart();
        console.log(getCart);
        expect(getCart).toBeDefined();
        expect(getCart.cart.id).toBeDefined();
        expect(getCart.cart.items).toBeInstanceOf(Array);
    });
});