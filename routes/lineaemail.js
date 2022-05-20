'use strict'

const router = require('express').Router({ mergeParams: true })
const lineaemail = require('../controllers/lineaemail')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,lineaemail.get)
.post(ensureAuth,lineaemail.create);

router.route('/read/:id')
.put(ensureAuth,lineaemail.update)
.delete(ensureAuth,lineaemail.delete);

module.exports = router