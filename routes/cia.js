'use strict'

const router = require('express').Router({ mergeParams: true });
const cia = require('../controllers/cia');
const auth = require('../middleware/auth');
const cm = require('connect-multiparty');
const md_upload = cm({ uploadDir: './uploads' });

const { ensureAuth } = auth;

router.route('/get-image/:file_name')
.get( cia.getImage);

router.route('/upload-image/:id')
.post([ensureAuth, md_upload], cia.uploadNovelImage);

router.route('/cias')
.get(ensureAuth,cia.getCias);

router.route('/update')
.post(ensureAuth,cia.createImage);

router.route('/read/:id')
.get(ensureAuth,cia.readCia)
.put(ensureAuth,cia.update);

module.exports = router