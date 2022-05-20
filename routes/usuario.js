'use strict'

const router = require('express').Router({ mergeParams: true });
const usuario = require('../controllers/usuarios');

const auth = require('../middleware/auth');

const { ensureAuth } = auth;

router.route('/getUsuarioA')
.get(ensureAuth,usuario.getUsuariosAct);

router.route('/sendUsuarios')
.post(ensureAuth,usuario.sendUsuarios);

router.route('/nameus')
.get(ensureAuth,usuario.getUsuariosName);

router.route('/getEx')
.get(ensureAuth,usuario.getUsuarioEx);

router.route('/getus')
.get(ensureAuth,usuario.getUsuarious);

router.route('/usuarios')
.get(ensureAuth,usuario.getUsuarios)
.post(ensureAuth, usuario.createUsuario)

router.route('/usuariossistema')
.get(ensureAuth,usuario.getUsuariosSistema)
.post(ensureAuth, usuario.createUsuario)

router.route('/get')
.get(ensureAuth, usuario.getUsuario)
.post(ensureAuth, usuario.createUsuarioInf)

router.route('/read/:id')
.get(ensureAuth,usuario.readUsuario)
.put(ensureAuth,usuario.update)
.delete(ensureAuth,usuario.delete);

router.route('/update/:id')
.put(ensureAuth,usuario.update2);

router.route('/login')
.post(usuario.login);

module.exports = router