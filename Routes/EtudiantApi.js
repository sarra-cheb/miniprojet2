const express = require('express');
const passport = require('passport');
const { getEtudiant, addEtudiant, editEtudiant, deleteEtudiant } = require('../Controllers/EtudiantController');
const router = express.Router();

router.get('/student', passport.authenticate('bearer', { session: false }), getEtudiant)
router.post('/student', passport.authenticate('bearer', { session: false }), addEtudiant)
router.put('/student/:id', passport.authenticate('bearer', { session: false }), editEtudiant)
router.delete('/student/:id', passport.authenticate('bearer', { session: false }), deleteEtudiant)

module.exports = router