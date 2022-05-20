'use strict'

const router = require('express').Router({ mergeParams: true })
const moduloI = require('../controllers/moduloInterfaz')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,moduloI.getModulos)
.post(ensureAuth,moduloI.createModulo);

router.route('/read/:id')
.put(ensureAuth,moduloI.update)
.get(ensureAuth,moduloI.read)

router.route('/getModinterfazlista')
.get(ensureAuth,moduloI.getModinterfazlista)

module.exports = router