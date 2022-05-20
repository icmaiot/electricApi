'use strict'

const router = require('express').Router({ mergeParams: true })
const registrodefectos = require('../controllers/registrodefectos')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,registrodefectos.get)
.post(ensureAuth,registrodefectos.create);

router.route('/read/:id')
.put(ensureAuth,registrodefectos.update)
.delete(ensureAuth,registrodefectos.delete);

module.exports = router