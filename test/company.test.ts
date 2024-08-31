import { initializeClient, getClient } from './setupClient';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await initializeClient();
});

describe('Test the Kanvas Company client', () => {

    it('gets user companies', async () => {
        const client = getClient();

        //if you pass anything with been a app owner it will return your user
        const userCompanies = await client.companies.getCompanies();
        expect(userCompanies).toBeDefined();
        expect(userCompanies.companies.data[0].name).toBeDefined();
    });

    it('uploads company profile photo', async () => {
        /*         const client = getClient();
        
                const userCompanies = await client.companies.getCompanies();
         */
        //const mockFile = createMockFile('dummy content', 'test.png', 'image/png');

        //const companyId = userCompanies.companies.data[0].id;
        //const response = await client.filesystem.updateCompanyPhotoProfile(mockFile, companyId);
        /*         expect(response).toBeDefined();
                expect(response.id).toBe(companyId); */
        /**
         * @todo help fix my error 
         * TypeError: source.on is not a function
         */
    });
});