import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});

describe('Test the Social Messages', () => {
    it('get products', async () => {
        const client = getClient();
        const products = client.inventory;
        const productList = await products.getProduct();
        expect(productList).toBeDefined();
        //console.log(recentMessages);
        //const { data } = recentMessages;
    });
});