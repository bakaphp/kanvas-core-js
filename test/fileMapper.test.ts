import { initializeClient, getClient } from './setupClient';
import path from 'path';
import fs from 'fs';

beforeAll(async () => {
    await initializeClient(process.env.KANVAS_APP_SECRET!);
});

describe('Test filesystem mapper', () => {
    it('upload file csv', async () => {
        const client = getClient();
        const filesystem = client.filesystem;

        const csvFilePath = path.join(__dirname + '/files', 'file.csv'); // Adjust the path as needed

        // Read the CSV file
        const file = fs.createReadStream(csvFilePath);

        let buffer = Buffer.alloc(0);
        for await (const chunk of file) {
          buffer = Buffer.concat([buffer, chunk]);
        }
      

        // Create a Blob object (simulates a File object in Node.js)
        const uploadCSV = await filesystem.uploadFileCsv(buffer);

        expect(uploadCSV).toBeDefined();
        expect(uploadCSV.uploadCsv.filesystem_id).toBeDefined();
        expect(uploadCSV.uploadCsv.header).toBeDefined();
        expect(uploadCSV.uploadCsv.row).toBeDefined();
        expect(uploadCSV.uploadCsv.row["List Number"]).toBeDefined();
        expect(uploadCSV.uploadCsv.header.length).toBeGreaterThan(0);
    });
});