'use strict'

// importas express
const router = require('express').Router({ mergeParams: true })
// importar controlador
const grafica_mats = require('../controllers/grafica_mats')
// importar auth
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

// rutas definidas
router.route('/get')
.get(ensureAuth,grafica_mats.get);

router.route('/consul')
.get(ensureAuth,grafica_mats.getConsul);

router.route('/maqc')
.get(ensureAuth,grafica_mats.getMaq);

router.route('/cau')
.get(ensureAuth,grafica_mats.getCausa);

module.exports = router

//nota agregar el routes a indes-routes