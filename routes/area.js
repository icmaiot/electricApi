'use strict'

const router = require('express').Router({ mergeParams: true })
const area = require('../controllers/area')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/areas')
.get(ensureAuth,area.getAreas)
.post(ensureAuth,area.createArea);

router.route('/read/:id')
.put(ensureAuth,area.update)
.delete(ensureAuth,area.delete)
.get(ensureAuth,area.readArea)

module.exports = router