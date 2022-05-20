'use strict'

const router = require('express').Router({ mergeParams: true })
const registroscrap = require('../controllers/registroscrap')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,registroscrap.get)
.post(ensureAuth,registroscrap.create);

router.route('/copy')
.get(ensureAuth,registroscrap.copy);

router.route('/read/:id')
.put(ensureAuth,registroscrap.update)
.delete(ensureAuth,registroscrap.delete);

module.exports = router