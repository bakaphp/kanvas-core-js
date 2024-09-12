import { ConfigInput } from '../src';
import { initializeClient, getClient } from './setupClient';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await initializeClient(process.env.KANVAS_APP_SECRET!);
});

/**
 * @todo add profile photo upload test
 */
describe('Test the Kanvas Custom Fields', () => {

    it('gets app settings - deprecated', async () => {
        const client = getClient();

        const appSettings = await client.settings.getAppSettings();
        expect(appSettings).toBeDefined();
        expect(appSettings?.name).toBeDefined();
        expect(appSettings?.settings).toBeDefined();
    });

    it('gets admin app settings', async () => {
        const client = getClient();

        const appSettings = await client.settings.fetchAppSettings();
        expect(appSettings?.adminAppSettings).toBeDefined();
        expect(appSettings?.adminAppSettings[0].key).toBeDefined();
        expect(appSettings?.adminAppSettings[0].value).toBeDefined();
        expect(appSettings?.adminAppSettings[0].public).toBeDefined();
    });

    it('gets admin app settings v2', async () => {
        const client = getClient();

        const appSettings = await client.settings.appSettings();
        expect(appSettings?.adminAppSettings).toBeDefined();
        expect(appSettings?.adminAppSettings[0].key).toBeDefined();
        expect(appSettings?.adminAppSettings[0].value).toBeDefined();
        expect(appSettings?.adminAppSettings[0].public).toBeDefined();
    });

    it('gets admin one app setting', async () => {
        const client = getClient();

        const appSettings = await client.settings.appSettings();
        const appSetting = await client.settings.appSetting(appSettings?.adminAppSettings[0].key ?? '');
        expect(appSetting).toBeDefined();
    });

    it('set app setting', async () => {
        const client = getClient();

        const newSetting = await client.settings.setAppSetting({
            key: 'test_key',
            value: 'new value',
            public: true
        } as ConfigInput);

        expect(newSetting).toBeTruthy();

        const result = await client.settings.appSetting('test_key');
        expect(result).toBe('new value');
    });

    it('delete app setting', async () => {
        const client = getClient();

        const newSetting = await client.settings.setAppSetting({
            key: 'test_key_delete',
            value: 'new value',
            public: true
        } as ConfigInput);

        expect(newSetting).toBeTruthy();

        const deleted = await client.settings.deleteAppSetting('test_key_delete');
        expect(deleted).toBeTruthy();
    });
});