'use strict'

const router = require('express').Router({ mergeParams: true })
const turnos = require('../controllers/turnos')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,turnos.get)
.post(ensureAuth,turnos.create);

router.route('/read/:id')
.put(ensureAuth,turnos.update)
.get(ensureAuth,turnos.read)
.delete(ensureAuth,turnos.delete);

module.exports = router