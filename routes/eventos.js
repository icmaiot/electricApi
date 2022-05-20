'use strict'

const router = require('express').Router({ mergeParams: true })
const e1 = require('../controllers/evento1')
const e2 = require('../controllers/evento2')
const e3 = require('../controllers/evento3')
const e4 = require('../controllers/evento4')
const e5 = require('../controllers/evento5')
const e6 = require('../controllers/evento6')
const e7 = require('../controllers/evento7')
const e8 = require('../controllers/evento8')
const auth = require('../middleware/auth');
const { ensureAuth } = auth;

router.route('/Operando')
.get(ensureAuth,e1.getEventos);

router.route('/En_Paro')
.get(ensureAuth,e2.getEventos);

router.route('/Stand_by')
.get(ensureAuth,e3.getEventos);

router.route('/Servicio')
.get(ensureAuth,e4.getEventos);

router.route('/Materiales')
.get(ensureAuth,e5.getEventos);

router.route('/Ingenieria')
.get(ensureAuth,e6.getEventos)

router.route('/Produccion')
.get(ensureAuth,e7.getEventos);

router.route('/Calidad')
.get(ensureAuth,e8.getEventos);

module.exports = router