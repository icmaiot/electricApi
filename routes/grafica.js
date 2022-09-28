'use strict'

const router = require('express').Router({ mergeParams: true })
const grafica = require('../controllers/grafica');
const auth = require('../middleware/auth');
const { ensureAuth } = auth;

router.route('/graficaSensor')
.get(ensureAuth,grafica.getGrafica);

router.route('/graficaEstadoR')
.get(ensureAuth,grafica.getEstadoReal);

router.route('/graficaAnillo')
.get(ensureAuth,grafica.getGraficaAnillo);

router.route('/graficaSobrepuesta')
.get(ensureAuth,grafica.getGraficaSobrepuesta);

router.route('/PGraficaSkuProducido')
.get(ensureAuth,grafica.PGraficaSkuProducido);

router.route('/PGraficaEficiencia')
.get(ensureAuth,grafica.PGraficaEficiencia);

module.exports = router