const MongoModel = require("../models/mongo.model");
require('dotenv').config();

const collectionName = process.env.MONGODB_COLLECTION;
const mongoModel = new MongoModel(process.env.MONGODB_URI);

class MongodbController {
  static async insertData (data) {
    const db = await mongoModel.connectDB(process.env.MONGODB_DBNAME);
    const result = await mongoModel.insertAData({ db, collectionName, data, });
    
    console.log(`${result} data inserted`);
  }

  static async insertManyData (data) {
    const db = await mongoModel.connectDB(process.env.MONGODB_DBNAME);
    const result = await mongoModel.insertManyData({ db, collectionName, data, });
    
    console.log(`${result} data inserted`);
  }

  static async updateAllData (data) {
    const db = await mongoModel.connectDB(process.env.MONGODB_DBNAME);
    data.forEach(async (destination) => {
      await mongoModel.updateData({db, collectionName, data: destination});
    });

    console.log('Data updated');
  }
}

module.exports = MongodbController;
