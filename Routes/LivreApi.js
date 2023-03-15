const express = require('express');
const passport = require('passport');
const { getBook, getbyidBook, addBook, editBook, deleteBook, affecte, desaffecte } = require('../Controllers/LivreController');


const router = express.Router();

router.get('/book', passport.authenticate('bearer', { session: false }), getBook)
router.get('/book/:idBook', passport.authenticate('bearer', { session: false }), getbyidBook)

router.post('/book', passport.authenticate('bearer', { session: false }), addBook)
router.put('/book/:idBook', passport.authenticate('bearer', { session: false }), editBook)
router.delete('/book/:idBook', passport.authenticate('bearer', { session: false }), deleteBook)


router.put('/book/:idBook/:idStudent', passport.authenticate('bearer', { session: false }), affecte)
router.put('/book/dessaffecte/:idBook/:idStudent', passport.authenticate('bearer', { session: false }), desaffecte)

module.exports = router