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
    let count = 0;
    const db = await mongoModel.connectDB(process.env.MONGODB_DBNAME);

    for (let i = 0; i < data.length; i += 1){
      let result = await mongoModel.updateData({db, collectionName, data: data[i]});
      count += result.modifiedCount;
    };

    console.log(`${count} Data updated`);
  }
}

module.exports = MongodbController;
