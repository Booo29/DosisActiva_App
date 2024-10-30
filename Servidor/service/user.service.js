const bcrypt = require("bcrypt-nodejs");
const db = require("../collections");
const User = db.user;


async function registerUser(req, res) {
    const user = new User(req.body);

    bcrypt.hash(user.Password, null, null, function (err, hash) {
        if (err) {
            res.status(500).send({ message: "Error enciptando la clave." });
        } else {
            user.Password = hash;
            user.save().then(() => {
                console.log('Usuario guardado con éxito');
                res.status(200).send({ status: 'Usuario guardado con éxito' });
              })
              .catch(error => {
                console.error('Error al guardar el usuario:', error);
              });
                
        }
    })
}

async function findByIdUser(req, res) {

    const user = await User.findById(req.params.userId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El usuario consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los usuarios" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}


async function findByNameAndPassword(req, res) {
    try {
      const user = await User.find({ Mail: req.params.name }).exec();
  
      if (!user || user.length === 0) {
        return res.status(404).send({ message: "El usuario no existe" });
      }else{
        bcrypt.compare(req.params.password, user[0].Password, (err, resc) => {
          if (resc) {
              res.status(200).send({ user: user[0] });
          } else {
              res.status(500).send({ message: "Usuario o contrasena erroneos" });
          }
      })
      }
     
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      return res.status(500).send({ message: "Error en el servidor" });
    }
  }
  

 
    //-----------------------------Buscar usuario por nombre o correo--------------------------
    async function findByNameOrMail(req, res) {
        try {
          const decodedDato = decodeURIComponent(req.params.dato);
          const regexDato = decodedDato.replace(/\s+/g, "\\s*");

          console.log(regexDato);
      
          const user = await User.find({
            $or: [
              { FullName: { $regex: regexDato, $options: "i" } },
              { Mail: { $regex: regexDato, $options: "i" } },
            ],
          }).exec();
      
          if (!user || user.length === 0) {
            return res.status(404).send({ message: "El usuario no existe" });
          }
      
          return res.status(200).send({ user });
        } catch (error) {
          console.error("Error al buscar el usuario:", error);
          return res.status(500).send({ message: "Error en el servidor" });
        }
      }
      
      

   async function findByMailAndUpdate(req, res) {
    try {
      const user = await User.findOne({ Mail: req.params.mail }).exec();
  
      if (!user) {
        return res.status(404).send({ message: "El usuario no existe" });
      }
  
      // Realiza la actualización de la información del usuario
      user.Cuidador = req.body.Cuidador; // Ajusta según los campos que deseas actualizar
  
      // Guarda los cambios
      await user.save();
  
      return res.status(200).send({ message: "Usuario actualizado correctamente", user });
    } catch (error) {
      console.error("Error al buscar y actualizar el usuario:", error);
      return res.status(500).send({ message: "Error en el servidor" });
    }
  }
  

 


 
 module.exports = {registerUser, findByIdUser, findByNameAndPassword,findByMailAndUpdate,findByNameOrMail};