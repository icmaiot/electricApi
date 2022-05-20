'use strict'

const router = require('express').Router({ mergeParams: true })
const ciudad = require('../controllers/ciudad')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/ciudad')
    .get(ensureAuth, ciudad.get)
    .post(ensureAuth, ciudad.create);

router.route('/read/:id')
    .put(ensureAuth, ciudad.update)
    .get(ensureAuth, ciudad.read)

module.exports = router