const Admin = require('../Models/Admin');

exports.getadmin = async (req, res) => {
  try {
    const admins = await Admin.find()
    res.send({ message: 'listes', admins })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.updateadmin = async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: 'updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteadmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id)
    res.send({ message: 'deleted succefully' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}