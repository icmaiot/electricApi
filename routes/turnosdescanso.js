'use strict'

const router = require('express').Router({ mergeParams: true })
const turnosdescanso = require('../controllers/turnosdescanso')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/sendTurnos')
    .post(ensureAuth,turnosdescanso.sendTurnos);

router.route('/get')
    .get(ensureAuth,turnosdescanso.get)
    .post(ensureAuth, turnosdescanso.create);

router.route('/read/:id')
    .put(ensureAuth, turnosdescanso.update)
    .get(ensureAuth, turnosdescanso.read)
    .delete(ensureAuth, turnosdescanso.delete);

module.exports = router