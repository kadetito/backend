const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DATABASE ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error iniciando la BBDD");
  }
};

module.exports = { dbConnection };
