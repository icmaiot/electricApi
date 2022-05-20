'use strict'

const router = require('express').Router({ mergeParams: true })
const produccionhistorico = require('../controllers/produccionhistorico')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,produccionhistorico.get)
.post(ensureAuth,produccionhistorico.create);

router.route('/read/:id')
.put(ensureAuth,produccionhistorico.update)
.delete(ensureAuth,produccionhistorico.delete);

module.exports = router