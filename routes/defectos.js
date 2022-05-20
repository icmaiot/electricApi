'use strict'

const router = require('express').Router({ mergeParams: true })
const defectos = require('../controllers/defectos')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/ins')
    .get(ensureAuth, defectos.getDefectosins);

router.route('/get')
    .get(ensureAuth, defectos.get)
    .post(ensureAuth, defectos.create);

router.route('/read/:id')
    .put(ensureAuth, defectos.update)
    .delete(ensureAuth, defectos.delete);

module.exports = router