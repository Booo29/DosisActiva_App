const mongoose = require("mongoose");

const Historial = mongoose.model(
  "Historial",
  new mongoose.Schema({
      Name: String,
      Date: Date,
      User:{        
        type: mongoose.Schema.Types.ObjectId,          
        ref: "User"
    },

  })
);
module.exports = Historial;