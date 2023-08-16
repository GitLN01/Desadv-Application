const fs = require('fs');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function uploadCSVFiles() {
  try {
    await client.connect();
    const db = client.db('Avnet');
    const collection = db.collection('db');

    const csvDirectory = '../DESADVdata';

    fs.readdir(csvDirectory, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        if (file.endsWith('.csv')) {
          const filePath = `${csvDirectory}/${file}`;
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', async (row) => {
              try {
                await collection.insertOne(row);
                console.log(`Inserted row from ${file}`);
              } catch (error) {
                console.error(`Error inserting row from ${file}:`, error);
              }
            })
            .on('end', () => {
              console.log(`Finished processing ${file}`);
            });
        }
      });
    });
  } finally {
    await client.close();
  }
}

uploadCSVFiles().catch(console.error);
