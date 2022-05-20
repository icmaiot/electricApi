'use strict'

const router = require('express').Router({ mergeParams: true })
const lineaprod = require('../controllers/lineaprod')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,lineaprod.get)
.post(ensureAuth,lineaprod.create);

router.route('/read/:id')
.put(ensureAuth,lineaprod.update)
.delete(ensureAuth,lineaprod.delete);

module.exports = router