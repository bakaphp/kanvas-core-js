import { initializeClient, getClient } from './setupClient';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await initializeClient(process.env.KANVAS_APP_SECRET!);
});

/**
 * @todo add profile photo upload test
 */
describe('Test the Kanvas Company Settings', () => {

    it('gets company settings', async () => {
        const client = getClient();

        const listOfCompanies = await client.companies.getCompanies();
        const companySettings = await client.settings.getCompanySettings(listOfCompanies.companies.data[0].uuid);
     
        expect(companySettings?.adminCompanySettings.length).toBeGreaterThan(0);
    });

    it('set company settings', async () => {
        const client = getClient();

        const listOfCompanies = await client.companies.getCompanies();
        const setCompanySettings = await client.settings.setCompanySettings({
            entity_uuid: listOfCompanies.companies.data[0].uuid,
            key: 'companyName',
            value: 'Kanvas',
            public: true
        });

        expect(setCompanySettings).toBeTruthy();
        
    });

    it('get company setting', async () => {
        const client = getClient();

        const listOfCompanies = await client.companies.getCompanies();
        const setCompanySettings = await client.settings.setCompanySettings({
            entity_uuid: listOfCompanies.companies.data[0].uuid,
            key: 'companyName',
            value: 'Kanvas',
            public: true
        });

        expect(setCompanySettings).toBeTruthy();

        const companySetting = await client.settings.companySetting(listOfCompanies.companies.data[0].uuid, 'companyName');
        expect(companySetting).toEqual('Kanvas');
        
    });
   
});