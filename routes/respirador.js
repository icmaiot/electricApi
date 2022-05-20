'use strict'

const router = require('express').Router({ mergeParams: true })
const respirador = require('../controllers/respirador');
const auth = require('../middleware/auth');
const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,respirador.getRespirador);


module.exports = router