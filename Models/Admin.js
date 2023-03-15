const mongoose = require('mongoose');
const schema = mongoose.Schema;
const AdminSchema = new schema({
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
  Password: {
    type: String,
    required: true
  }
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('Admin', AdminSchema)