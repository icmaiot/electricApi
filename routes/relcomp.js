'use strict'

const router = require('express').Router({ mergeParams: true })
const relcomp = require('../controllers/relcomp')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/relcomp')
    .get(ensureAuth, relcomp.get)
    .post(ensureAuth, relcomp.create);

router.route('/read/:id')
    .put(ensureAuth, relcomp.update)
    .get(ensureAuth, relcomp.read)
    .delete(ensureAuth, relcomp.delete);

module.exports = router