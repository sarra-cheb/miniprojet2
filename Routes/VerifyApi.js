const express = require('express')
const { VerifyList } = require('../Controllers/VerifyController')

const router = express.Router()

router.get('/verify', VerifyList)

module.exports = router