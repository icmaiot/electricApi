'use strict'

const router = require('express').Router({ mergeParams: true });
const statuswo = require('../controllers/statuswo');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/statuswo')
    .get(ensureAuth, statuswo.get)
    .post(ensureAuth, statuswo.create);

router.route('/read/:id')
    .get(ensureAuth, statuswo.read)
    .put(ensureAuth, statuswo.update)
    .delete(ensureAuth, statuswo.delete);

module.exports = router