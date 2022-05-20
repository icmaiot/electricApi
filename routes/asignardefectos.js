'use strict'

const router = require('express').Router({ mergeParams: true })
const asignardefectos = require('../controllers/asignardefectos')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,asignardefectos.get)
.post(ensureAuth,asignardefectos.create);

router.route('/read/:id')
.put(ensureAuth,asignardefectos.update)
.delete(ensureAuth,asignardefectos.delete);

module.exports = router