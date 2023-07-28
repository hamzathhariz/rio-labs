const { MongoClient } = require('mongodb');

const uri = "mongodb://0.0.0.0:27017/"; 
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('my_database'); 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = connectToDB;