const service = require("../service/reminder.service");

const express = require("express");

const api = express.Router();

api.post("/reminder/createReminder", service.createReminder);

module.exports = api;