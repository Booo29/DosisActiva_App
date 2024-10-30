const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    Mail:{
      type: String,
      unique: true
    },
    Password: String,
    FullName: String,
    Birthdate: Date,
    Address: String,
    Phone_Number: Number,
    Rol:String,
    Cuidador:{        
      type: mongoose.Schema.Types.ObjectId,          
      ref: "User"
  },
  })
);


module.exports = User;