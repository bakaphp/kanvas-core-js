import { initializeClient, getClient } from './setupClient';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await initializeClient();
});

/**
 * @todo add profile photo upload test
 */
describe('Test the Kanvas Company client', () => {

    it('gets user companies', async () => {
        const client = getClient();

        //if you pass anything with been a app owner it will return your user
        const userCompanies = await client.companies.getCompanies();
        expect(userCompanies).toBeDefined();
        expect(userCompanies.companies.data[0].name).toBeDefined();
    });

    it('list of users who belong to this company', async () => {
        const client = getClient();

        //const userCompanies = await client.companies.getCompanies();
        const companyUsers = await client.companies.getCompanyUsers({});
        expect(companyUsers.companyUsers).toBeDefined();
        expect(companyUsers.companyUsers.data.length).toBeGreaterThanOrEqual(0);

    });
});