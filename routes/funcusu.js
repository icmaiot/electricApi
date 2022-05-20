'use strict'

const router = require('express').Router({ mergeParams: true })
const funcusu = require('../controllers/funcusu')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/get')
.get(ensureAuth,funcusu.get)
.post(ensureAuth,funcusu.create);

router.route('/read/:id')
.put(ensureAuth,funcusu.update)
.get(ensureAuth,funcusu.read)
.delete(ensureAuth,funcusu.delete);

module.exports = router