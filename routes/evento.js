'use strict'

const router = require('express').Router({ mergeParams: true });
const evento = require('../controllers/evento');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/eventos')
.get(ensureAuth,evento.getEventos);

router.route('/get')
.get(ensureAuth,evento.getEventoSql);

module.exports = router