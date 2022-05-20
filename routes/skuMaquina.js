'use strict'

const router = require('express').Router({ mergeParams: true })
const sku = require('../controllers/skuMaquina')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/getRmt')
.get(ensureAuth,sku.getRmt);

router.route('/getProductosMaquina')
.get(ensureAuth,sku.getProductosMaquina);

router.route('/sendProductosMaquina')
.post(ensureAuth,sku.sendProductosMaquina);

router.route('/get')
.get(ensureAuth,sku.get)
.post(ensureAuth,sku.create);

router.route('/read/:id')
.get(ensureAuth,sku.read)
.put(ensureAuth,sku.update)
.delete(ensureAuth,sku.delete);

module.exports = router