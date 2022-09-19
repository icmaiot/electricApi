'use strict'

const router = require('express').Router({ mergeParams: true })

const grafica_calidad = require('../controllers/grafica_calidad')

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,grafica_calidad.getc);

router.route('/consul')
.get(ensureAuth,grafica_calidad.getConsulc);

router.route('/maqc')
.get(ensureAuth,grafica_calidad.getMaqc);

router.route('/cau')
.get(ensureAuth,grafica_calidad.getCausac);

module.exports = router