'use strict'

const router = require('express').Router({ mergeParams: true })
const raw = require('../controllers/raw')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,raw.get)
.post(ensureAuth,raw.create);

router.route('/read/:id')
.put(ensureAuth,raw.update)
.get(ensureAuth,raw.read)
.delete(ensureAuth,raw.delete)

module.exports = router