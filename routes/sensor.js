'use strict'

const router = require('express').Router({ mergeParams: true });
const sensor = require('../controllers/sensor');

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/sensores')
.get(ensureAuth,sensor.getSensores)
.post(ensureAuth,sensor.createSensor)

router.route('/read/:id')
.put(ensureAuth,sensor.update)
.delete(ensureAuth,sensor.delete)
.get(ensureAuth,sensor.readSensor)

module.exports = router