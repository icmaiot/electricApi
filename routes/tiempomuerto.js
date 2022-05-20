'use strict'

const router = require('express').Router({ mergeParams: true });
const tiempomuerto = require('../controllers/tiempomuerto')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/tmp')
.get(ensureAuth,tiempomuerto.tmp)

router.route('/tm')
.get(ensureAuth,tiempomuerto.tm)

router.route('/get')
.get(ensureAuth,tiempomuerto.get)
.post(ensureAuth, tiempomuerto.create);

router.route('/read/:id')
.put(ensureAuth,tiempomuerto.update)
.get(ensureAuth,tiempomuerto.read)
.delete(ensureAuth,tiempomuerto.delete);

module.exports = router