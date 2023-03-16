const Livre = require('../Models/Livre')
const Etudiant = require('../Models/Etudiant')

exports.VerifyList = async (req, res) => {
  try {
    const students = await Etudiant.find()
    const DateTo = new Date();
    console.log(DateTo)
    const daterendu = DateTo - (3 * 24 * 60 * 60 * 1000)
    console.log(daterendu)
    const foundlist = students.filter((element) => element.Date_de_prise_du_livre < daterendu
    )
    const result = foundlist.map(element => element.Nom)
    res.send({ message: 'liste de etudiants qui ont depasser la date de rendu du livre', result })
  } catch (error) {
    res.status(500).send({ message: 'error serveur' || error })
  }

}