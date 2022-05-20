'use strict'

const router = require('express').Router({ mergeParams: true })
const producto = require('../controllers/producto')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/MaquinaByProducto')
.get(ensureAuth,producto.MaquinaByProducto);

router.route('/verProdlinea')
.get(ensureAuth,producto.VerificaProdlinea);

router.route('/get')
.get(ensureAuth,producto.get)
.post(ensureAuth, producto.create);

router.route('/buscar')
.get(ensureAuth, producto.get2)

router.route('/read/:id')
.put(ensureAuth,producto.update)
.get(ensureAuth,producto.read)
.delete(ensureAuth,producto.delete);

module.exports = router