import { initializeClient, getClient } from './setupClient';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await initializeClient(process.env.KANVAS_APP_SECRET!);
});

describe('Test the KanvasCore client', () => {
    it('initializes correctly', async () => {
        const client = getClient();
        expect(client).toBeDefined();
    });

    it('gets user info by id', async () => {
        const client = getClient();
        const user = await client.users.getUserByDisplayName('test');

        const userInfo = await client.app.users.getAppUsers({
            first: 1,
            whereCondition: {
                column: "ID",
                operator: "EQ",
                value: user.id,
            }
        })

        expect(userInfo.appUsers.data.length).toBe(1);
        expect(userInfo.appUsers.data[0].id).toBe(user.id);
    });

});