'use strict'

const Registroscrap = require('../models').Registroscrap;
const models = require('../models');
const sequelize = models.Sequelize;
let op = sequelize.Op;
const _sequelize = models.sequelize;

const CONST_ERROR = {
    ERROR: {
        status: 500,
        message: 'Error al guardar el registro '
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
    NOT_FOUND: {
        status: 404,
        message: 'Error al encontrar el sensor',
        code: 'SENSOR_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'La máquina ya tiene una orden en proceso'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    REGISTERED: {
        status: 403,
        message: 'Sensor ya existe'
    },
    NOT_MAQUINA: {
        status: 403,
        message: 'No hay máquinas asignadas para el producto'
    }

}

function Error(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {
    get: async function (req, res) {
        try {
            let query = {};
            let busqueda = req.query.busqueda;
            if (busqueda != '') {
                query = {
                    idscrapreg: busqueda
                }
            }
            let response = await Registroscrap.findAll({
                attributes: ['idscrapreg', 'descripcion_scrap', 'cod_scrap'],
                where: query,
            })
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new Error(CONST_ERROR.NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...CONST_ERROR.ERROR })
            }
        }
    },

    copy: async function (req, res) {
        try {
            let productocopy = req.query.productocopy == '' ? '-1' : req.query.productocopy;
            let productonew = req.query.productonew == '' ? '-1' : req.query.productonew;
            let opcion = req.query.opcion == '' ? '-1' : req.query.opcion;
            const response =await _sequelize.query('CALL defectos_scrap_copia(:productocopy,:productonew ,:opcion )',
            {replacements: { productocopy: productocopy, productonew:productonew, opcion:opcion  }}
            ).then((resultValues) => { console.log('resultValues', resultValues); }
            ).catch((error) => { console.log('Error', error); });
            res.status(200).send({ code: 200, response });
        }
        catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
      },

    create: async function (req, res) {
        try {
            let response_new = new Registroscrap(req.body);
            const response = await response_new.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    delete: async function (req, res) {
        try {
            const response = await Registroscrap.destroy({
                where: { idscrapreg: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Contacto eliminadao', response })
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    update: async function (req, res) {
        try {
            const resp = await Registroscrap.update(req.body, {
                where: { idscrappreg: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Registro modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
}