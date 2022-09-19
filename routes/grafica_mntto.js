'use strict'

const router = require('express').Router({ mergeParams: true })

const grafica_mntto = require('../controllers/grafica_mntto')

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,grafica_mntto.gets);

router.route('/consul')
.get(ensureAuth,grafica_mntto.getConsuls);

router.route('/maqc')
.get(ensureAuth,grafica_mntto.getMaqs);

router.route('/cau')
.get(ensureAuth,grafica_mntto.getCausas);

module.exports = router
