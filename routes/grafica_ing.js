'use strict'

const router = require('express').Router({ mergeParams: true })

const grafica_ing = require('../controllers/grafica_ing')

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,grafica_ing.geti);

router.route('/consul')
.get(ensureAuth,grafica_ing.getConsuli);

router.route('/maqc')
.get(ensureAuth,grafica_ing.getMaqi);

router.route('/cau')
.get(ensureAuth,grafica_ing.getCausai);

module.exports = router