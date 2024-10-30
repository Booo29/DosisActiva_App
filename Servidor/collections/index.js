const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.collection");
db.medicament = require("./medicament.collection");
db.reminder = require("./reminder.collection");
db.historial = require("./historial.collection");



module.exports = db;