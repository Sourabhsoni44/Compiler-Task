const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

const db = client.db('webcompiler');
const questionsCollection = db.collection('questions');
const usersCollection = db.collection('users');

const insertQuestions = async () => {
  await questionsCollection.insertMany([
    { language: 'solidity', difficulty: 'easy', expectedOutputHash: 'hash1' },
    { language: 'rust', difficulty: 'medium', expectedOutputHash: 'hash2' },
    { language: 'motoko', difficulty: 'hard', expectedOutputHash: 'hash3' }
  ]);
};


module.exports = { questionsCollection, usersCollection };
