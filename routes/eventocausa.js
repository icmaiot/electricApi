'use strict'

const router = require('express').Router({ mergeParams: true })
const eventocausa = require('../controllers/eventocausa')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,eventocausa.get)
.post(ensureAuth,eventocausa.create);

router.route('/read/:id')
.put(ensureAuth,eventocausa.update)
.get(ensureAuth,eventocausa.read)
.delete(ensureAuth,eventocausa.delete);

module.exports = router