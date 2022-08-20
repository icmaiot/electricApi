'use strict'

const Usuario = require('../models').Usuario
const Departamento = require('../models').Departamento
const Evento = require('../models').Evento
const models = require('../models')
const sequelize = models.Sequelize;
const _sequelize = models.sequelize;
const op = sequelize.Op;
const moment = require('moment');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'SECRETKEY_ICMA_AUTOMATION1234';
const jwt = require('jsonwebtoken');

const USUARIO_ERROR = {
    ERROR: {
        status: 500,
        message: 'Error al guardar el usuario'
    },
    PASSWORD_FAIL: {
        status: 406,
        message: 'Contraseña incorrecta',
        code: 'PASSWORD_FAILED'
    },
    AUTH_FAILED: {
        status: 401,
        message: 'Auth Failed',
        code: 'AUTH_FAILED'
    },
    USUARIO_NOT_FOUND: {
        status: 404,
        message: 'Usuario no existe',
        code: 'USUARIO_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'Usuario y/o correo ya existen'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    USUARIO_REGISTERED: {
        status: 403,
        message: 'Usuario existente'
    }, INVALID_EMAIL: {
        status: 403,
        message: 'Correo no existe',
        code: 'INVALID_EMAIL'
    },
    INVALID_PASSWORD: {
        status: 403,
        message: 'Contraseña incorrecta',
        code: 'INVALID_PASSWORD'
    },
}

function UsuarioError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
}

module.exports = {
    getUsuarios: async function (req, res) {


        let query = {};
        let busqueda = req.query.busqueda;
        let evento = req.query.evento;
        let status = req.query.status;
        if (busqueda != '' && evento != '' && status != '') {
            query = {
                username: {
                    [op.substring]: busqueda
                },
                idevento: evento,
                activousr: status,
            }
        } else if (busqueda != '' && evento != '') {
            query = {
                username: {
                    [op.substring]: busqueda
                },
                idevento: evento,
            }
        } else if (busqueda != '' && status != '') {
            query = {
                username: {
                    [op.substring]: busqueda
                },
                activousr: status,

            }
        } else if (evento != '' && status != '') {
            query = {
                idevento: evento,
                activousr: status,
            }
        } else if (busqueda != '') {
            query = {
                username: {
                    [op.substring]: busqueda
                }

            }
        } else if (evento != '') {
            query = { idevento: evento, }
        } else if (status != '') {
            query = { activousr: status, }
        }

        try {
            let usuario = await Usuario.findAll({
                attributes: ['id', 'username', 'email', 'password', 'nivelseg', 'iddep', 'celular', 'nip', 'idevento', 'Username_last', 'activousr', 'permitir_linea'],
                where: query,
                include: [{
                    model: Departamento,
                    required: true,
                    attributes: ['iddep', 'departamento', 'idcia']
                },
                {
                    model: Evento,
                    required: true,
                    attributes: ['idevento', 'evento', 'color']
                }
                ]
            })
            if (usuario) {
                res.status(200).send({
                    code: 200, usuario
                })
            } else {
                throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...USUARIO_ERROR.ERROR })
            }

        }

    },

    getUsuariosName: async function (req, res) {
        try {
          const response = await _sequelize.query('CALL nameus();');
          if(response){
              res.status(200).send({code:200,response});
          }else{
            throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND)
          }
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...USUARIO_ERROR.ERROR })
            }

        }
      },

       getModuloInterfaz: async function (req, res) {
    try {
      const response = await _sequelize.query('CALL Modinterfazlista();');
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

    getUsuariosSistema: async function (req, res) {

        let query = {};
        let busqueda = req.query.busqueda;
        let status = req.query.status;
        if (busqueda != '' && status != '') {
            query = {
                nivelseg: { [op.gte]: 1 },
                activousr: status,
                username: {
                    [op.substring]: busqueda
                }
            }
        } else if (busqueda != '') {
            query = {
                nivelseg: { [op.gte]: 1 },
                username: {
                    [op.substring]: busqueda
                }

            }
        } else if (status != '') {
            query = {
                nivelseg: { [op.gte]: 1 },
                activousr: status
            }
        } else {
            query = { nivelseg: { [op.gte]: 1 } }
        }

        try {
            let usuario = await Usuario.findAll({
                attributes: ['id', 'username', 'email', 'password', 'nivelseg', 'iddep', 'celular', 'nip', 'idevento', 'Username_last', 'activousr', 'permitir_linea'],
                where: query,
                include: [{
                    model: Departamento,
                    required: true,
                    attributes: ['iddep', 'departamento', 'idcia']
                },
                {
                    model: Evento,
                    required: true,
                    attributes: ['idevento', 'evento', 'color']
                }
                ]
            })
            if (usuario) {
                res.status(200).send({
                    code: 200, usuario
                })
            } else {
                throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...USUARIO_ERROR.ERROR })
            }

        }

    },
    getUsuario: async function (req, res) {

        let query = {};
        let busqueda = req.query.busqueda;
        if (busqueda != '') {
            query = {
                username: {
                    [op.substring]: busqueda
                }
            }
        }
        try {
            let usuario = await Usuario.findAll({
                attributes: ['id', 'username', 'email', 'password', 'nivelseg', 'iddep', 'celular', 'nip', 'idevento', 'Username_last', 'activousr', 'permitir_linea'],
                where: query,
                include: [{
                    model: Departamento,
                    required: true,
                    attributes: ['iddep', 'departamento', 'idcia']
                },
                {
                    model: Evento,
                    required: true,
                    attributes: ['idevento', 'evento', 'color']
                }
                ]
            })
            if (usuario) {
                res.status(200).send({
                    code: 200, usuario
                })
            } else {
                throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...USUARIO_ERROR.ERROR })
            }

        }

    },

    getUsuarious: async function (req, res) {
        let query = {};
        let busqueda = req.query.id;
        if (busqueda != '') {
            query = {
                id: {
                    [op.substring]: busqueda
                }
            }
        }
        try {
            let response = await Usuario.findOne({
                attributes: ['id', 'username', 'email', 'Username_last', 'activousr', 'permitir_linea'],
                where: query,
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...USUARIO_ERROR.ERROR })
            }

        }

    },

    getUsuarioEx: async function (req, res) {

        try {
            let response = await Usuario.findAll({
                attributes: ['id', 'username', 'email','Username_last', 'activousr', 'permitir_linea'],
                where: {password : {[op.not]: null}},
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...USUARIO_ERROR.ERROR })
            }

        }

    },

    getUsuariosAct: async function (req, res) {
        try {
          const response = await _sequelize.query('CALL UsuariosByActivousr();');
          if(response){
            res.status(200).send({code:200,response});
        }else{
            throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND)
        }

    }
    catch (error) {
        console.error(error)
        if (error instanceof UsuarioError) {
            res.status(error.status).send(error)
        } else {
            res.status(500).send({ ...USUARIO_ERROR.ERROR })
        }

    }
      },

    sendUsuarios: async function (req, res) {
        //console.log(req.body.topic)
      },
      
    createUsuario: async function (req, res) {
        try {
            const usuario = await Usuario.findOne({
                where: {
                    [op.or]: [
                        {
                            email: req.body.email
                        },
                        {
                            //username: req.body.username
                        }]
                }
            });
            if (usuario) {
                throw new UsuarioError(USUARIO_ERROR.DUPLICATE);
            }
            let new_usuario = new Usuario(req.body);
            new_usuario.password = await bcrypt.hash(req.body.password, 5);
            new_usuario.nivelseg = 1;
            new_usuario.create_time = moment().format();
            new_usuario.last_update = moment().format();
            const response = await new_usuario.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al guardar el usuario' })
            }
        }
    },
    createUsuarioInf: async function (req, res) {
        try {
            const usuario = await Usuario.findOne({
                where: {
                    [op.or]: [
                        {
                            username: req.body.username
                        }]
                }
            });
            if (usuario) {
                throw new UsuarioError(USUARIO_ERROR.DUPLICATE);
            }
            let new_usuario = new Usuario(req.body);
            new_usuario.password  = await bcrypt.hash(req.body.password, 5);
            new_usuario.nivelseg = 1;
            new_usuario.create_time = moment().format();
            new_usuario.last_update = moment().format();
            const response = await new_usuario.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al guardar el usuario' })
            }
        }
    },
    readUsuario: async function (req, res) {
        try {
            let usuario = await Usuario.findOne({ 
                attributes: ['id', 'username', 'email', 'Username_last', 'activousr'],
                where: { id: req.params.id } });
            if (usuario) {
                res.status(200).send({ code: 200, usuario });
            } else {
                throw new UsuarioError(USUARIO_ERROR.USUARIO_NOT_FOUND);
            }
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al obtener el usuario' })
            }
        }
    },


    update: async function (req, res) {
        try {
            
            const resp = await Usuario.update(req.body, {
                where: { id: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Usuario modificado', resp })


        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al modificar el usuario' })
            }
        }
    },

    update2: async function (req, res) {
        try {
            let usuario = Usuario.update(req.body);
            usuario.password  = await bcrypt.hash(req.body.password, 5);
            const resp = await usuario.update(req.body, {
            
                where: { id: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Usuario modificado', resp })


        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al modificar el usuario' })
            }
        }
    },


    delete: async function (req, res) {
        try {
            const response = await Usuario.destroy({
                where: { id: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Usuario eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Error al eliminar el usuario' })
            }
        }
    },
    login: async function (req, res) {
        try {
            const usuario = await Usuario.findOne({
                where: { email: req.body.email },
                include: [{
                    model: Departamento,
                    required: true,
                    attributes: ['idcia']
                }]
            });
            if (!usuario) {
                throw new UsuarioError(USUARIO_ERROR.INVALID_EMAIL);
            }
            const resultPassword = bcrypt.compareSync(req.body.password, usuario.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: usuario._id },
                    SECRET_KEY, {
                    expiresIn: expiresIn
                });

                const dataUser = {
                    email: usuario.email,
                    id: usuario.id,
                    username: usuario.username,
                    token: accessToken,
                    expires: expiresIn,
                    idcia: usuario.Departamento.idcia
                }
                res.status(200).send({ code: 200, dataUser });
            } else {
                res.status(403).send({ code: 403, message: 'Contraseña incorrecta' });
            }
        } catch (error) {
            if (error instanceof UsuarioError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ message: 'Error al iniciar sesión' })
            }
        }
    }
}
