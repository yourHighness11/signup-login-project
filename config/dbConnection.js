const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/signUp");
    console.log('connected to mongoDB');
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;