import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});

describe('Test the Commerce', () => {
    it('get cart', async () => {
        const client = getClient();
        const cart = client.cart;
        const getCart = await cart.getCart();

        expect(getCart).toBeDefined();
        expect(getCart.cart.id).toBeDefined();
        expect(getCart.cart.items).toBeInstanceOf(Array);
    });

    it('updates discount codes in cart', async () => {
        const client = getClient();
        const cart = client.cart;
        
        // Test adding discount codes
        const updatedCart = await cart.updateDiscountCodes(['KANVAS']);
        expect(updatedCart).toBeDefined();
        expect(updatedCart.cartDiscountCodesUpdate.id).toBeDefined();
        expect(updatedCart.cartDiscountCodesUpdate.items).toBeInstanceOf(Array);

        // Optional: Test clearing discount codes
        const clearedCart = await cart.updateDiscountCodes([]);
        expect(clearedCart).toBeDefined();
        expect(clearedCart.cartDiscountCodesUpdate.id).toBeDefined();
    });

    // Optional: Test error case
    it('handles invalid discount codes', async () => {
        const client = getClient();
        const cart = client.cart;
        
        try {
            await cart.updateDiscountCodes(['INVALID_CODE']);
        } catch (error) {
            expect(error).toBeDefined();
            // Add more specific error checks based on your API's error response
        }
    });
});