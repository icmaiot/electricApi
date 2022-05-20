'use strict'

const router = require('express').Router({ mergeParams: true })
const subensamble = require('../controllers/subensamble')
const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/MaquinaBySubensamble')
.get(ensureAuth,subensamble.MaquinaBySubensamble);

router.route('/get')
.get(ensureAuth,subensamble.get)
.post(ensureAuth,subensamble.create);

router.route('/read/:id')
.put(ensureAuth,subensamble.update)
.get(ensureAuth,subensamble.read)
.delete(ensureAuth,subensamble.delete)

module.exports = router