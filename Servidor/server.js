require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");
const port = process.env.PORT || 8080;
const urlmongoose = process.env.MONGODB_URI;

async function startServer() {
  try {
    await mongoose.connect(urlmongoose,{ useNewUrlParser: true, useUnifiedTopology: true });

    console.log("La conexión a la base de datos es correcta.");

    app.listen(port, () => {
      console.log("API REST corriendo en el puerto: " + port);
      console.log(`http://${config.IP_SERVER}:${port}/api/${config.API_VERSION}/`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

startServer();
