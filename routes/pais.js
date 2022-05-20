'use strict'

const router = require('express').Router({ mergeParams: true })
const pais = require('../controllers/pais')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/pais')
    .get(ensureAuth, pais.get)
    .post(ensureAuth, pais.create);

router.route('/read/:id')
    .put(ensureAuth, pais.update)
    .get(ensureAuth, pais.read)

module.exports = router