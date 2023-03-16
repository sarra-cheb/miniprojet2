const Etudiant = require('../Models/Etudiant');
const Livre = require('../Models/Livre');
const nodemailer = require('nodemailer')

exports.addBook = async (req, res) => {
  try {
    await Livre.create(req.body)
    res.send({ message: 'book added' })

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}
exports.getbyidBook = async (req, res) => {
  try {
    const Books = await Livre.findById(req.params.idBook).populate("Etudiant")
    res.send({ message: 'liste des Livres', Books })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.getBook = async (req, res) => {
  try {
    const Books = await Livre.find()
    res.send({ message: 'liste des livres', Books })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.editBook = async (req, res) => {
  try {
    await Livre.findByIdAndUpdate(req.params.idBook, req.body)
    res.send({ message: 'Book updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteBook = async (req, res) => {
  try {
    await Livre.findByIdAndDelete(req.params.id)
    res.send({ message: 'Book deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}
exports.affecte = async (req, res) => {
  try {
    const found = await Livre.findById(req.params.idBook)
    console.log(found)
    console.log(found.Disponibilité)
    if (found.Disponibilité) {
      if (found.Nbre_de_copies > 1) {
        await Livre.findByIdAndUpdate(req.params.idBook, { $inc: { Nbre_de_copies: -1 }, $push: { Etudiant: req.params.idStudent } })
        await Etudiant.findByIdAndUpdate(req.params.idStudent, { Date_de_prise_du_livre: found.updatedAt }, { new: true })
        const found2 = await Etudiant.findById(req.params.idStudent)
        console.log(found2)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "sarrach9080@gmail.com",
            pass: "lmaosoxbepcwuzyw",
          }
        });
        await transporter.sendMail({
          from: "sarrach9080@gmail.com",
          to: found2.Email,
          subject: 'date pour rendre la livre',
          text: `hello ${found2.Nom} ${found2.Prenom},
        you have the copy of book number ${found.Nbre_de_copies} with a title ${found.Titre} you must render the book after 3 days of this date ${found.updatedAt}`,
        })


        res.send({ message: 'etudiant affecte ' })

      }
      else if (found.Nbre_de_copies == 1) {
        await Livre.findByIdAndUpdate(req.params.idBook, { $inc: { Nbre_de_copies: -1 }, Disponibilité: false, $push: { Etudiant: req.params.idStudent } })
        await Etudiant.findByIdAndUpdate(req.params.idStudent, { Date_de_prise_du_livre: found.updatedAt }, { new: true })
        const found2 = await Etudiant.findById(req.params.idStudent)
        console.log(found2)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "sarrach9080@gmail.com",
            pass: "lmaosoxbepcwuzyw",
          }
        });
        await transporter.sendMail({
          from: "sarrach9080@gmail.com",
          to: found2.Email,
          subject: 'date pour rendre la livre',
          text: `hello ${found2.Nom} ${found2.Prenom},
        you have the copy of book number ${found.Nbre_de_copies} with a title ${found.Titre} you must render the book after 3 days of this date ${found.updatedAt}`,
        })
        res.send({ message: 'etudiant affecte ' })
      } else {
        res.send({ message: "il reste pas des copies pour cet livre " })
      }
    }
    else {
      res.send({ message: "le livre demandé n'est pas disponible aujourdhui" })
    }

  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}

exports.desaffecte = async (req, res) => {
  try {
    const found = await Livre.findById(req.params.idBook)
    const found2 = await Etudiant.findById(req.params.idStudent)

    await Livre.findByIdAndUpdate(req.params.idBook, { $inc: { Nbre_de_copies: +1 }, Disponibilité: true, $pull: { Etudiant: req.params.idStudent } })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "sarrach9080@gmail.com",
        pass: "lmaosoxbepcwuzyw",
      }
    });
    await transporter.sendMail({
      from: "sarrach9080@gmail.com",
      to: found2.Email,
      subject: 'rendu livre',
      text: `hello ${found2.Nom} ${found2.Prenom},
     you have been render the book with a title ${found.Titre}`,
    })
    res.send({ message: 'student desaffected' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}