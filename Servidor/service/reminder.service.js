const db = require("../collections");
const Reminder = db.reminder;


async function createReminder(req, res) {
    const reminder = new Reminder(req.body);
    reminder.save().then(() => {
        console.log('Recordatorio guardado con éxito');
        res.status(200).send({ status: 'Recordatorio guardado con éxito' });
      })
      .catch(error => {
        console.error('Error al guardar el Recordatorio:', error);
      });
}

module.exports = {
    createReminder  
};