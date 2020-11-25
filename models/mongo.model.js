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
}

module.exports = MongoModel;