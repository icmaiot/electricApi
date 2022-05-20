'use strict'

const router = require('express').Router({ mergeParams: true })
const configuracionM = require('../controllers/configuracionModuloInterfaz')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,configuracionM.get)
.post(ensureAuth,configuracionM.create);

router.route('/read/:id')
.put(ensureAuth,configuracionM.update)
.get(ensureAuth,configuracionM.read)
.delete(ensureAuth,configuracionM.delete)

module.exports = router