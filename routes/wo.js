'use strict'

const router = require('express').Router({ mergeParams: true });
const wo = require('../controllers/wo');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/wo')
    .get(ensureAuth, wo.get)
    .post(ensureAuth, wo.create);

router.route('/buscar')
    .get(ensureAuth, wo.get2)

router.route('/empresa')
    .get(ensureAuth, wo.getE);

router.route('/read/:id')
    .get(ensureAuth, wo.read)
    .put(ensureAuth, wo.update)
    .delete(ensureAuth, wo.delete);

module.exports = router