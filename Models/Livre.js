const mongoose = require('mongoose');
const schema = mongoose.Schema;
const LivreSchema = new schema({
  Titre: {
    type: String,
    required: true
  },
  Nom_de_l_auteur: {
    type: String,
    required: true
  },
  Categorie: {
    type: String,
    required: true
  },
  Nbre_de_copies: {
    type: Number,
    required: true
  },
  Disponibilité: {
    type: Boolean,
    required: true
  },
  Etudiant: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etudiant'
  }]
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('Livre', LivreSchema)