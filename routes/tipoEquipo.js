'use strict'

const router = require('express').Router({ mergeParams: true })
const tipo = require('../controllers/tipoEquipo')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/tipos')
.get(ensureAuth,tipo.getTipoEquipos)
.post(ensureAuth,tipo.createTipo);

router.route('/read/:id')
.put(ensureAuth,tipo.update)
.delete(ensureAuth,tipo.delete)
.get(ensureAuth,tipo.readTipo)

module.exports = router