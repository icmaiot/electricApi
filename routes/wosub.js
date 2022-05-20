'use strict'

const router = require('express').Router({ mergeParams: true });
const wosub = require('../controllers/wosub');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/wosub')
    .get(ensureAuth, wosub.get)
    .post(ensureAuth, wosub.create);

router.route('/read/:id')
    .get(ensureAuth, wosub.read)
    .put(ensureAuth, wosub.update)
    .delete(ensureAuth, wosub.delete);

module.exports = router