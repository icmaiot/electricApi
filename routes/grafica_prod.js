'use strict'

const router = require('express').Router({ mergeParams: true })

const grafica_prod = require('../controllers/grafica_prod')

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,grafica_prod.getp);

router.route('/consul')
.get(ensureAuth,grafica_prod.getConsulp);

router.route('/maqc')
.get(ensureAuth,grafica_prod.getMaqp);

router.route('/cau')
.get(ensureAuth,grafica_prod.getCausap);

module.exports = router
