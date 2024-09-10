import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});

describe('Test the location service', () => {
    it('get location', async () => {
        const client = getClient();
        const locations = client.locations.getAllCountries();

        expect(locations).toBeDefined();
    });
});