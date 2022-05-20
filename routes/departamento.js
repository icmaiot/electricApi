'use strict'

const router = require('express').Router({ mergeParams: true });
const departamento = require('../controllers/departamento');

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/departamentos')
.get(ensureAuth,departamento.getDepartamentos)
.post(ensureAuth,departamento.createDepartamento);

router.route('/read/:id')
.put(ensureAuth,departamento.update)
.delete(ensureAuth,departamento.delete)
.get(ensureAuth,departamento.readDepartamento)

module.exports = router