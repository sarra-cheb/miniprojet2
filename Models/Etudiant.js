const mongoose = require('mongoose');
const schema = mongoose.Schema;
const EtudiantSchema = new schema({
  Nom: {
    type: String,
    required: true
  },
  Prenom: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Niveau: {
    type: String,
    required: true
  },
  Date_de_prise_du_livre: {
    type: String
  }
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('Etudiant', EtudiantSchema)