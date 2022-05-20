'use strict'

const router = require('express').Router({ mergeParams: true })
const asignarscrap = require('../controllers/asignarscrap')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,asignarscrap.get)
.post(ensureAuth,asignarscrap.create);

router.route('/read/:id')
.put(ensureAuth,asignarscrap.update)
.delete(ensureAuth,asignarscrap.delete);

module.exports = router