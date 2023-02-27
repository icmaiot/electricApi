
'use strict'

const Modulormt = require('../models').Modulormt;
const models = require('../models');
const sequelize = models.Sequelize;
let op = sequelize.Op;
const _sequelize = models.sequelize;


const MODULO_ERROR = {
    ERROR: {
        status: 500,
        message: 'Error al guardar el módulo rmt '
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
        message: 'Error al encontrar el módulo rmt',
        code: 'MODULO_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'El módulo rmt ya existe'
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
        message: 'Módulo rmt ya existe'
    }
}

function ModuloError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

function ModuloError(error, modulo) {
    const { status, message } = error
    this.status = status
    this.message = message
    this.modulo = modulo;
}

module.exports = {
    getModuloRMT: async function (req, res) {
        try {
            let query = {};
            let busqueda = req.query.busqueda;
            if (busqueda) {
                query = {
                    idrmt:  busqueda
                
                }
            }
            const response = await Modulormt.findAll({
                attributes: ['idrmt', 'serialrmt', 'ciclormt', 'segrmt', 'fereset'],
                where: query,
            })
            if (response) {
                res.status(200).send({ code: 200, response })
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
    getModuloRMTlista: async function (req, res) {
        try {
            const response = await _sequelize.query('CALL modrmtlista();');
            if (response) {
                res.status(200).send({ code: 200, response })
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
    create: async function (req, res) {
        try {
            let serialrmt = req.body.serialrmt;
            let modulo = await Modulormt.findOne({ attributes: ['idrmt', 'serialrmt',], where: { serialrmt: serialrmt } });
            if (modulo) {
                res.status(500).send({ code: 600, message: 'Duplicado' })
                throw new ModuloError(MODULO_ERROR.DUPLICATE, modulo);
                
            }
            let new_modulo = new Modulormt(req.body);
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
            const resp = await Modulormt.update(req.body, {
                where: { idrmt: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Módulo modificado', resp })
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
    delete: async function (req, res) {
        try {
          const response = await Modulormt.destroy({
            where: { idrmt: req.params.id }
          })
          res.status(200).send({ code: 200, message: 'Módulo eliminado', response })
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
}