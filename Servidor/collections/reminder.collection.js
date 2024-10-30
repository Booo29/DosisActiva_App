const mongoose = require("mongoose");

const Reminder = mongoose.model(
  "Reminder",
  new mongoose.Schema({
    Hour: String,
    Minute: String,
    Second: String,
    Repeat: Boolean,
    Days: [String],
    Dose: Number,
    MedicamentName: String,
    User:{        
        type: mongoose.Schema.Types.ObjectId,          
        ref: "User"
    },
  })
);


module.exports = Reminder;