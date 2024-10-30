const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const config  = require('./config');
const cors = require('cors');

const userRouters = require("./routes/user");
const medicamentRouters = require("./routes/medicament");
const reminderRouters = require("./routes/reminder");
const historialRouters = require("./routes/historial");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(`/api/${config.API_VERSION}`, userRouters);
app.use(`/api/${config.API_VERSION}`, medicamentRouters);
app.use(`/api/${config.API_VERSION}`, reminderRouters);
app.use(`/api/${config.API_VERSION}`, historialRouters);


module.exports = app;