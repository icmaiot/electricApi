'use strict'

const router = require('express').Router({ mergeParams: true })
const evento_registro = require('../controllers/evento_registro')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,evento_registro.get)
.post(ensureAuth,evento_registro.create);

router.route('/read')
.put(ensureAuth,evento_registro.update)
.delete(ensureAuth,evento_registro.delete);

router.route('/eveq')
.get(ensureAuth,evento_registro.getEventoEquipo);

router.route('/eveq2')
.get(ensureAuth,evento_registro.getEventoCatalago);


module.exports = router