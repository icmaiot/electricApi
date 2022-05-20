'use strict'

const router = require('express').Router({ mergeParams: true })
const perfilConfig = require('../controllers/perfilConfig')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,perfilConfig.get)
.post(ensureAuth,perfilConfig.create);

router.route('/read/:id')
.put(ensureAuth,perfilConfig.update)
.get(ensureAuth,perfilConfig.read)
.delete(ensureAuth,perfilConfig.delete)
module.exports = router