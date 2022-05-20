'use strict'

const router = require('express').Router({ mergeParams: true })
const produccion = require('../controllers/produccion')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,produccion.get)
.post(ensureAuth, produccion.create);

router.route('/read/:id')
.put(ensureAuth,produccion.update)
.get(ensureAuth,produccion.read)
.delete(ensureAuth,produccion.delete);

module.exports = router