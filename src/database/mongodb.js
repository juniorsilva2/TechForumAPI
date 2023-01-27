const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    (error) => {
      if (error) {
        return console.log(
          `Ocorreu um erro ao se conectar com o banco de dados: ${error}`
        );
      }
      return console.log("Conexão com o banco de dados realizada com sucesso!");
    }
  );
};

module.exports = connectToDatabase;
