'use strict'

const router = require('express').Router({ mergeParams: true })
const evento_asignacion = require('../controllers/evento_asignacion')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,evento_asignacion.get)
.post(ensureAuth,evento_asignacion.create);

router.route('/read')
.put(ensureAuth,evento_asignacion.update)
.delete(ensureAuth,evento_asignacion.delete);

module.exports = router