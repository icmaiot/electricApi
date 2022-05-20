'use strict'

const router = require('express').Router({ mergeParams: true });
const tiempomuertop = require('../controllers/tiempomuertop')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/tmp')
.get(ensureAuth,tiempomuertop.tm_periodo)

router.route('/tm')
.get(ensureAuth,tiempomuertop.tm)

router.route('/get')
.get(ensureAuth,tiempomuertop.get)
.post(ensureAuth, tiempomuertop.create);

router.route('/read/:id')
.put(ensureAuth,tiempomuertop.update)
.get(ensureAuth,tiempomuertop.read)
.delete(ensureAuth,tiempomuertop.delete);

module.exports = router