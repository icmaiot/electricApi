'use strict'

const router = require('express').Router({ mergeParams: true });
const maquina = require('../controllers/maquina');
const auth = require('../middleware/auth');
const { ensureAuth } = auth;
const cm = require('connect-multiparty');
const md_upload = cm({ uploadDir: './uploads' });

//app.post('/api/password-reset', md_auth.changePasswordTokenAuth, userController.updateUserPassword);

router.route('/send-email')
.post(ensureAuth,maquina.sendEmail);

router.route('/sendDescanso')
.post(ensureAuth,maquina.sendDescanso);

router.route('/PTablaLinea')
.get(ensureAuth,maquina.PTablaLinea);

router.route('/PGraficaLinea')
.get(ensureAuth,maquina.PGraficaLinea);

router.route('/PGraficaOEE')
.get(ensureAuth,maquina.PGraficaOEE);

router.route('/PGraficaOEEGLOBAL')
.get(ensureAuth,maquina.PGraficaOEEGLOBAL);

router.route('/modin')
.get(ensureAuth,maquina.getModuloInterfaz);

router.route('/modrmt')
.get(ensureAuth,maquina.getModuloRMT);

router.route('/linea')
.get(ensureAuth,maquina.getLinea);

router.route('/buscar')
.get(ensureAuth,maquina.getMaquinaLista);

router.route('/ejecucion')
.get(ensureAuth,maquina.getMaquinaEjecucion);

router.route('/historico')
.get(ensureAuth,maquina.getHistorico);

router.route('/filtroTm')
.get(ensureAuth,maquina.filtroTm);

router.route('/filtroScrap')
.get(ensureAuth,maquina.filtroScrap);

router.route('/filtroDefectos')
.get(ensureAuth,maquina.filtroDefectos);

router.route('/maquina')
.get(ensureAuth,maquina.getMaquina);

router.route('/getInterfaz')
.get(ensureAuth,maquina.getInterfaz);

router.route('/getCorreos')
.get(ensureAuth,maquina.getCorreos);

router.route('/maquinas')
.get(ensureAuth,maquina.getMaquinas)
.post(ensureAuth,maquina.createMaquina);

router.route('/read/:id')
.put(ensureAuth,maquina.update)
.delete(ensureAuth,maquina.delete)
.get(ensureAuth,maquina.readMaquina);

module.exports = router