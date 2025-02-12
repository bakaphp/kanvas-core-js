import { initializeClient, getClient } from './setupClient';

beforeAll(async () => {
    await initializeClient();
});

describe('Test the Soc', () => {
    it('get tags', async () => {
        const client = getClient();
        const tags = client.tags;
        const tagList = await tags.getTags({
            where: { column: 'IS_FEATURE', operator: 'EQ', value: 1 },
            orderBy: [{ column: 'WEIGHT', order: 'ASC' }],
        });

        expect(tagList).toBeDefined();
    });
});