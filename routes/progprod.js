'use strict'

const router = require('express').Router({ mergeParams: true })
const progprod = require('../controllers/progprod')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.post(ensureAuth,progprod.create);

router.route('/getprogprodf')
.get(ensureAuth,progprod.getprogprodf);

router.route('/getprogprodfprod')
.get(ensureAuth,progprod.getprogprodprod);

router.route('/getprogprodwo')
.get(ensureAuth,progprod.getprogprodwo);

router.route('/getprogprodprioridad')
.get(ensureAuth,progprod.getprogprodprioridad);

router.route('/read/:id')
.put(ensureAuth,progprod.update)
.delete(ensureAuth,progprod.delete);

router.route('/updateDown/:id')
.put(ensureAuth,progprod.updateDown);

router.route('/updateUp/:id')
.put(ensureAuth,progprod.updateUp)

router.route('/updateStatus/:id')
.put(ensureAuth,progprod.updateStatus)

module.exports = router