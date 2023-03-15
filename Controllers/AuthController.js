const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const Admin = require('../Models/Admin');

exports.register = async (req, res) => {

  try {
    const found = await Admin.findOne({ Email: req.body.Email })
    if (found) {
      res.status(400).send({ message: 'email already exist' })
    }
    else {
      const salt = bcrypt.genSaltSync(10);
      req.body.Password = bcrypt.hashSync(req.body.Password, salt);
      const Administrateur = await Admin.create(req.body)
      res.status(201).send({ message: 'account created succesfully', Administrateur })
    }
  } catch (error) {
    res.status(500).send({ message: 'error serveur' || error })
  }

}
exports.login = async (req, res) => {
  try {
    const found = await Admin.findOne({ Email: req.body.Email })

    if (found) {
      const valid = bcrypt.compareSync(req.body.Password, found.Password)
      if (valid) {
        const data = {
          firstname: found.Nom,
          Useremail: found.Email,
          UserId: found._id
        }
        const token = jwt.sign(data, 'secret', { expiresIn: '1d' });
        res.status(200).send({ message: 'connected successfully', token })
      }
      else {
        res.status(400).send({ message: 'verify password' })
      }
    }
    else {
      res.send({ message: 'verify email and password' })
    }

  } catch (error) {
    res.status(500).send({ message: 'erreur serveur' || error })
  }
}