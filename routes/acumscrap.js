'use strict'

const router = require('express').Router({ mergeParams: true })
const acumscrap = require('../controllers/acumscrap')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,acumscrap.get)
.post(ensureAuth,acumscrap.create);

router.route('/read/:id')
.put(ensureAuth,acumscrap.update)
.get(ensureAuth,acumscrap.read)
.delete(ensureAuth,acumscrap.delete);

module.exports = router