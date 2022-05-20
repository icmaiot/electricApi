'use strict'

const router = require('express').Router({ mergeParams: true })
const sub = require('../controllers/subMaquina')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/getRmt')
.get(ensureAuth,sub.getRmt);

router.route('/getSubensambleMaquina')
.get(ensureAuth,sub.getSubensambleMaquina);

router.route('/sendSubensambleMaquina')
.post(ensureAuth,sub.sendSubensambleMaquina);

router.route('/get')
.get(ensureAuth,sub.get)
.post(ensureAuth,sub.create);

router.route('/read/:id')
.get(ensureAuth,sub.read)
.put(ensureAuth,sub.update)
.delete(ensureAuth,sub.delete);

module.exports = router