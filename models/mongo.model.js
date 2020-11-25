const { MongoClient } = require("mongodb");
require('dotenv').config();

class MongoModel {
  constructor (uri) {
    this._client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  
  async connectDB (dbName) {
    try {
      await this._client.connect();
      return this._client.db(dbName);
    } catch (error) {
      console.log(error);
    }
  }

  async insertAData ({ db, collectionName, data }) {
    try {
      const collection = db.collection(collectionName);
      const result = await collection.insertOne(data);
      return result.insertedCount;
    } catch (error) {
      console.log(error)
    }
  }

  async insertManyData ({ db, collectionName, data }) {
    try {
      const collection = db.collection(collectionName);
      const result = await collection.insertMany(data, { ordered: true });
      return result.insertedCount;
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MongoModel;
