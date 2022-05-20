'use strict'

const router = require('express').Router({ mergeParams: true })
const estado = require('../controllers/estado')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/estado')
    .get(ensureAuth, estado.get)
    .post(ensureAuth, estado.create)
    .post(ensureAuth, estado.read)

router.route('/read/:id')
    .put(ensureAuth, estado.update)
    .get(ensureAuth, estado.read)

module.exports = router