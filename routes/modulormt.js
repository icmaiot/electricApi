'use strict'

const router = require('express').Router({ mergeParams: true })
const modulormt = require('../controllers/modulormt')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/getModrmt')
    .get(ensureAuth, modulormt.getModuloRMTlista);

router.route('/get')
.get(ensureAuth,modulormt.getModuloRMT)
.post(ensureAuth,modulormt.create);

router.route('/read/:id')
    .put(ensureAuth, modulormt.update)
    .delete(ensureAuth, modulormt.delete);


module.exports = router