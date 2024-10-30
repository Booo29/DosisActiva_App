const service = require("../service/medicament.service");

const express = require("express");

const api = express.Router();

api.post("/medicament/createMedicament", service.createMedicament);

api.get("/medicament/findAllMedicaments", service.findAllMedicaments);

api.get("/medicament/findByIdMedicament/:medicamentId", service.findByIdMedicament);

api.put("/medicament/updateMedicament/:medicamentId", service.updateMedicament);

api.delete("/medicament/deleteMedicament/:medicamentId", service.deleteMedicament);

api.get("/medicament/getAllMedicamentsByUser/:userId/:status", service.getAllMedicamentsByUser);

api.get("/medicament/getAllMedicamentsByUserAndDays/:userId/:days/:status", service.getAllMedicamentsByUserAndDays);

module.exports = api;