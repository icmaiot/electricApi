'use strict'

const router = require('express').Router({ mergeParams: true });
const empresa = require('../controllers/empresa');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/empresa')
    .get(ensureAuth, empresa.getEmpresa)
    .post(ensureAuth, empresa.create);

router.route('/get')
    .get(ensureAuth, empresa.getEmpresa2);

router.route('/empai')
    .get(ensureAuth, empresa.empai);

router.route('/read/:id')
    .get(ensureAuth, empresa.read)
    .put(ensureAuth, empresa.update)
    .delete(ensureAuth, empresa.delete);

module.exports = router