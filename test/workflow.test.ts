import { initializeClient, getClient } from './setupClient';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
    await initializeClient(process.env.KANVAS_APP_SECRET!);
});

/**
 * @todo add profile photo upload test
 */
describe('Test the Kanvas Workflow', () => {

    it('run workflow', async () => {
        const client = getClient();

        const workflow = await client.workflow.runWorkflowFromEntity({
            entity_namespace: 'user',
            entity_id: '2',
            action: 'updated',
            params: {
                name: 'John Doe',
            }
        });

        expect(workflow).toBeDefined();
        expect(workflow.runWorkflowFromEntity).toBeDefined();
        expect(workflow.runWorkflowFromEntity.success).toBeTruthy();
    });
});