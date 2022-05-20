'use strict'

const router = require('express').Router({ mergeParams: true })
const prodregisro = require('../controllers/prodregisro')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,prodregisro.get)
.post(ensureAuth,prodregisro.create);

router.route('/read/:id')
.put(ensureAuth,prodregisro.update)
.delete(ensureAuth,prodregisro.delete);

module.exports = router