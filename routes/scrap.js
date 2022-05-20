'use strict'

const router = require('express').Router({ mergeParams: true })
const scrap = require('../controllers/scrap')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/ins')
.get(ensureAuth,scrap.getScrapins);

router.route('/get')
.get(ensureAuth,scrap.get)
.post(ensureAuth,scrap.create);

router.route('/read/:id')
.put(ensureAuth,scrap.update)
.delete(ensureAuth,scrap.delete);

module.exports = router