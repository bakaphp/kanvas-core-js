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
    expect(uploadCSV.uploadCsv.row['List Number']).toBeDefined();
    expect(uploadCSV.uploadCsv.header.length).toBeGreaterThan(0);
  });
});

describe('Test filesystem create and update mapper', () => {
  it('create filesystem mapper', async () => {
    const client = getClient();
    const filesystemMapper = client.filesystemMapper;
    const systemModules = await client.systemModules.getSystemModules(1, 1);
    const input = {
      name: 'Test Mapper',
      system_module_id: systemModules[0].id,
      file_header: {
        'List Number': 'list_number',
        'First Name': 'first_name',
        'Last Name': 'last_name',
        Email: 'email',
        Phone: 'phone',
        Address: 'address',
        City: 'city',
        State: 'state',
        Zip: 'zip',
        Country: 'country',
        'Date of Birth': 'dob',
      },
      mapping: {
        list_number: 'list_number',
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email',
        phone: 'phone',
        address: 'address',
        city: 'city',
        state: 'state',
        zip: 'zip',
        country: 'country',
        dob: 'dob',
      },
      configuration: "Configuration",
    };
    const filesytem = await filesystemMapper.createFilesystemMapper(input);
    expect(filesytem).toBeDefined();
    expect(filesytem.name).toBe(input.name);
    expect(filesytem.file_header).toEqual(input.file_header);
    expect(filesytem.mapping).toEqual(input.mapping);
  });
});
