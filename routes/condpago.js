'use strict'

const router = require('express').Router({ mergeParams: true })
const condpago = require('../controllers/condpago')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/condpago')
    .get(ensureAuth, condpago.get)
    .post(ensureAuth, condpago.create);

router.route('/read/:id')
    .put(ensureAuth, condpago.update)
    .get(ensureAuth, condpago.read)
    .delete(ensureAuth, condpago.delete);

module.exports = router