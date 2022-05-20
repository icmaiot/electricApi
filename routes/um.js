'use strict'

const router = require('express').Router({ mergeParams: true })
const um = require('../controllers/um')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,um.get)
.post(ensureAuth,um.create);

router.route('/read/:id')
.put(ensureAuth,um.update)
.get(ensureAuth,um.read)
.delete(ensureAuth,um.delete);

module.exports = router