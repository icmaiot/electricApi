'use strict'

const router = require('express').Router({ mergeParams: true })
const produccionlote = require('../controllers/produccionlote')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/descanso')
.get(ensureAuth,produccionlote.getDescanso);

router.route('/sendDataEncoder')
.post(ensureAuth,produccionlote.DataEncoder);

router.route('/getlote')
.get(ensureAuth,produccionlote.getLoteActivo);

router.route('/getlotefinal')
.get(ensureAuth,produccionlote.getLotefinal);

router.route('/getdata')
.get(ensureAuth,produccionlote.getData);

router.route('/getboard')
.get(ensureAuth,produccionlote.getBoard);

router.route('/getpro')
.get(ensureAuth,produccionlote.getpreparacion);

router.route('/get')
.get(ensureAuth,produccionlote.getlote)
.post(ensureAuth, produccionlote.create);

router.route('/read/:id')
.put(ensureAuth,produccionlote.update)
.delete(ensureAuth,produccionlote.delete);

module.exports = router