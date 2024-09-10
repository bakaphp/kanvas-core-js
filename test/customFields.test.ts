import { ConfigInput } from '../src';
import { initializeClient, getClient } from './setupClient';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    //await initializeClient(process.env.KANVAS_APP_SECRET!);
    await initializeClient();
});

/**
 * @todo add profile photo upload test
 */
describe('Test the Kanvas Custom Fields', () => {

  
});