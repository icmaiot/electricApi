'use strict'

const router = require('express').Router({ mergeParams: true })
const acumcal = require('../controllers/acumcal')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,acumcal.get)
.post(ensureAuth,acumcal.create);

router.route('/read/:id')
.put(ensureAuth,acumcal.update)
.get(ensureAuth,acumcal.read)
.delete(ensureAuth,acumcal.delete);

module.exports = router