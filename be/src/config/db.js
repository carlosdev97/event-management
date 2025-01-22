const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDBMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Successful connection to MongoDB on port ${process.env.PORT}.`
    );
  } catch (error) {
    console.error("Error en la conexión a MongoDB: ", error);
    process.exit(1);
  }
};

module.exports = connectDBMongo;
