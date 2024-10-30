const db = require("../collections");
const Medicament = db.medicament;

async function createMedicament(req, res) {
    const medicament = new Medicament(req.body);
    medicament.save().then(() => {
        console.log('Medicamento guardado con éxito');
        res.status(200).send({ status: 'Medicamento guardado con éxito' });
      })
      .catch(error => {
        console.error('Error al guardar el medicamento:', error);
      });
}

async function findAllMedicaments(req, res) {
    const medicaments = await Medicament.find().exec();
    if (!medicaments || medicaments.length === 0) {
        return res.status(404).send({ message: "No se encontraron medicamentos" });
    }else{
        res.status(200).send({ medicaments: medicaments });
    }
}

async function findByIdMedicament(req, res) {
    const medicament = await Medicament.findById(req.params.medicamentId, (err, medicamentStored) => {
        if (err) {
            res.status(500).send({ message: "El medicamento consultado no existe" });
        } else {
            if (!medicamentStored) {
                res.status(404).send({ message: "Error cargando los medicamentos" });
            } else {
                res.status(200).send({ medicament: medicamentStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

async function updateMedicament(req, res) {
    const medicament = await Medicament.findByIdAndUpdate(req.params.medicamentId, req.body, {
        new: true
    });
    if (!medicament) {
        return res.status(404).send({ message: "No se encontró el medicamento" });
    } else {
        res.status(200).send({ medicament: medicament });
    }
}

async function deleteMedicament(req, res) {
    const medicament = await Medicament.findByIdAndRemove(req.params.medicamentId);
    if (!medicament) {
        return res.status(404).send({ message: "No se encontró el medicamento" });
    } else {
        res.status(200).send({ medicament: medicament });
    }
}

async function getAllMedicamentsByUser(req, res) {
    const medicaments = await Medicament.find({ User: req.params.userId, Status: req.params.status }).exec();
    if (!medicaments || medicaments.length === 0) {
        return res.status(404).send({ message: "No se encontraron medicamentos" });
    }else{
        res.status(200).send({ medicaments: medicaments });
    }
}

async function getAllMedicamentsByUserAndDays(req, res) {
    const medicaments = await Medicament.find({ User: req.params.userId, Days: req.params.days, Status: req.params.status }).exec();
    if (!medicaments || medicaments.length === 0) {
        return res.status(404).send({ message: "No se encontraron medicamentos" });
    }else{
        res.status(200).send({ medicaments: medicaments });
    }
}


module.exports = {
    createMedicament,
    findAllMedicaments,
    findByIdMedicament,
    updateMedicament,
    deleteMedicament,
    getAllMedicamentsByUser,
    getAllMedicamentsByUserAndDays
};