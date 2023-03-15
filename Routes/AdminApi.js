const express = require('express');
const passport = require('passport');
const { getadmin, updateadmin, deleteadmin } = require('../Controllers/AdminController');

const router = express.Router();

router.get('/admin', passport.authenticate('bearer', { session: false }), getadmin);
router.put('/admin/:id', passport.authenticate('bearer', { session: false }), updateadmin)
router.delete('/admin/:id', passport.authenticate('bearer', { session: false }), deleteadmin)

module.exports = router