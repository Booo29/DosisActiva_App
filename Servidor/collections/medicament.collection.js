const mongoose = require("mongoose");

const Medicament = mongoose.model(
  "Medicament",
  new mongoose.Schema({
      ID: {
      type: String,
      unique: true
      },
      Name: String,
      Dose: String,
      Indications: String,
      Image: String,
      Status: String,
      Days: [
        String
      ],
      User:{        
        type: mongoose.Schema.Types.ObjectId,          
        ref: "User"
    },

  })
);
module.exports = Medicament;