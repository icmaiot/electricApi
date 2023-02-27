
'use strict'

const ModuloInterfaz = require('../models').ModuloInterfaz;
const PerfilConfig = require('../models').PerfilConfig;
const models = require('../models');
const sequelize = models.Sequelize;
let op = sequelize.Op;
const _sequelize = models.sequelize;


const MODULO_ERROR = {
    ERROR: {
        status: 500,
        message: 'Error al guardar el módulo interfaz '
    },
    PASSWORD_FAIL: {
        status: 406,
        message: 'Password Failed',
        code: 'PASSWORD_FAILED'
    },
    AUTH_FAILED: {
        status: 401,
        message: 'Auth Failed',
        code: 'AUTH_FAILED'
    },
    MODULO_NOT_FOUND: {
        status: 404,
        message: 'Error al encontrar el módulo interfaz',
        code: 'MODULO_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'El módulo interfaz ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    MODULO_REGISTERED: {
        status: 403,
        message: 'Módulo interfaz ya existe'
    }
}

function ModuloError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

function ModuloError(error,modulo) {
    const { status, message } = error
    this.status = status
    this.message = message
    this.modulo = modulo;
}

module.exports = {
    getModulos: async function (req, res) {
        try {
            let query = {activo:1};
            let busqueda = req.query.busqueda;
            if (busqueda) {
                query = {
                    serial: {
                        [op.substring]: busqueda
                    }
                }
            }
            const moduloI = await ModuloInterfaz.findAll({
                attributes: ['idmodulo', 'serial', 'activo', 'idperfil'],
                where: query,
                 include: [{
                   model: PerfilConfig,
                   required: false,
                   attributes: ['idperfil', 'nombreperfil', 'descripcion','automanual']
                 }]
            })
            if (moduloI) {
                res.status(200).send({
                    code: 200, moduloI
                })
            } else {
                throw new ModuloError(MODULO_ERROR.MODULO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof ModuloError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...MODULO_ERROR.ERROR })
            }

        }
    },
    getModinterfazlista: async function (req, res) {
        try {
          const modulo =await _sequelize.query('CALL Modinterfazlista();');
          if(modulo){
              res.status(200).send({code:200,modulo});
          }else{
              throw new Error(MODULO_ERROR.NOT_FOUND)
          }
        } catch (error) {
          console.error(error)
          if (error instanceof Error) {
            res.status(error.status).send(error)
          } else {
            res.status(500).send({ ...MODULO_ERROR.ERROR })
          }
        }
      },
    createModulo: async function (req, res) {
        try {
            let serial = req.body.serial;
            let moduloI = await ModuloInterfaz.findOne({ attributes: ['idmodulo', 'serial', 'idperfil', 'activo'], where: { serial: serial } });
            if (moduloI) {
                throw new ModuloError(MODULO_ERROR.DUPLICATE,moduloI);
            }
            let new_modulo = new ModuloInterfaz(req.body);
            const response = await new_modulo.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof ModuloError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    update: async function (req, res) {
        try {
            const resp = await ModuloInterfaz.update(req.body, {
                where: { idmodulo: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Módulo Interfaz modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof ModuloError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    read: async function (req, res) {
        try {
            let moduloI = await ModuloInterfaz.findOne({ where: { idmodulo: req.params.id } });
            if (moduloI) {
                res.status(200).send({ code: 200, moduloI });
            } else {
                throw new ModuloError(MODULO_ERROR.MODULO_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof ModuloError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }
}