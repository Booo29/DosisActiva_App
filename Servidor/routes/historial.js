const service = require("../service/historial.service");

const express = require("express");

const api = express.Router();

api.post("/historial/createHistorial", service.createHistorial);

api.get("/historial/getAllHistorialByUser/:userId", service.getAllHistorialByUser);

module.exports = api;