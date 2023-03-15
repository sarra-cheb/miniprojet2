const Etudiant = require('../Models/Etudiant');

exports.addEtudiant = async (req, res) => {
  try {
    const found = await Etudiant.findOne({ Email: req.body.Email })
    if (found) {
      res.status(400).send({ message: 'email exist ,try another one' })
    }
    else {
      await Etudiant.create(req.body)
      res.send({ message: 'student added succefully' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}
exports.getEtudiant = async (req, res) => {
  try {
    const students = await Etudiant.find()
    res.send({ message: 'liste des etudiants', students })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.editEtudiant = async (req, res) => {
  try {
    await Etudiant.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: 'updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteEtudiant = async (req, res) => {
  try {
    await Etudiant.findByIdAndDelete(req.params.id)
    res.send({ message: 'deleted' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}