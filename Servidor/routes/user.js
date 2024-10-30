const service = require("../service/user.service");

const express = require("express");

const api = express.Router();

api.post("/user/registerUser", service.registerUser);

//api.get("/user/findByIdUsuario/:userId", service.findByIdUsuario);

 api.get("/user/findByNameAndPassword/:name/:password", service.findByNameAndPassword);

// api.put("/usuario/actualizarUsuario/:usuarioId", controller.actualizarUsuario);

api.get("/user/findByNameOrMail/:dato", service.findByNameOrMail);

api.put("/user/findByMailAndUpdate/:mail", service.findByMailAndUpdate);




module.exports = api;