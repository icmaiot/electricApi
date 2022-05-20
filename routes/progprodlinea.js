'use strict'

const router = require('express').Router({ mergeParams: true })
const progprodlinea = require('../controllers/progprodlinea')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/sendLineaprod')
.post(ensureAuth,progprodlinea.sendLineaprod);

router.route('/buscar')
.get(ensureAuth,progprodlinea.filtro);

router.route('/selecturno')
.get(ensureAuth,progprodlinea.getseleccionturno);

router.route('/acum')
.get(ensureAuth,progprodlinea.getAcum);

router.route('/getlinea')
.get(ensureAuth,progprodlinea.getRlinea);

router.route('/get')
.get(ensureAuth,progprodlinea.get)
.post(ensureAuth, progprodlinea.create);

router.route('/getprogprodlinea')
.get(ensureAuth, progprodlinea.getprogprodlinea);

router.route('/read/:id')
.put(ensureAuth,progprodlinea.update)
.delete(ensureAuth,progprodlinea.delete);

module.exports = router