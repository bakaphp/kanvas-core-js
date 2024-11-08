import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});


describe('Test Commerce orders', () => {

    it('create order from cart', async () => {
        const client = getClient();

        const order = client.order;

        const result = await order.createOrderFromCart({
            input: {
                cartId: 'default',
                customer: {
                    email: 'test@test.dev'
                }
            }
        });

        expect(result.createOrderFromCart.message).toMatchObject({
            error_code: "Cart is empty",
            error_message: "Cart is empty"
        });
    });

});