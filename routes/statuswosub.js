'use strict'

const router = require('express').Router({ mergeParams: true });
const statuswosub = require('../controllers/statuswosub');
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/statuswosub')
    .get(ensureAuth, statuswosub.get)
    .post(ensureAuth, statuswosub.create);

router.route('/read/:id')
    .get(ensureAuth, statuswosub.read)
    .put(ensureAuth, statuswosub.update)
    .delete(ensureAuth, statuswosub.delete);

module.exports = router