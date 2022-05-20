'use strict'

const router = require('express').Router({ mergeParams: true })
const controlprod = require('../controllers/controlprod')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
    .get(ensureAuth, controlprod.get)
    .post(ensureAuth, controlprod.create)
    .post(ensureAuth, controlprod.read)

router.route('/read/:id')
    .put(ensureAuth, controlprod.update)
    .get(ensureAuth, controlprod.read)

module.exports = router