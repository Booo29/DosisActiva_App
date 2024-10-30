const db = require("../collections");
const Historial = db.historial;


async function createHistorial(req, res) {
    const historial = new Historial(req.body);
    historial.save().then(() => {
        console.log('Historial guardado con éxito');
        res.status(200).send({ status: 'Historial guardado con éxito' });
      })
      .catch(error => {
        console.error('Error al guardar el Historial:', error);
      });
}

async function getAllHistorialByUser(req, res) {
    const historial = await Historial.find({ User: req.params.userId }).exec();
    if (!historial || historial.length === 0) {
        return res.status(404).send({ message: "No se encontraron historiales" });
    }else{
        res.status(200).send({ historial: historial });
    }
}

module.exports = {
    createHistorial,
    getAllHistorialByUser
};