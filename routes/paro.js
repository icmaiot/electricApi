'use strict'

const router = require('express').Router({ mergeParams: true })
const paro = require('../controllers/paro')

router.route('/paros')
.get(paro.getParos)

module.exports = router