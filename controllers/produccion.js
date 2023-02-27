
'use strict'
const models = require('../models');
const Produccion = require('../models').Produccion;
const sequelize = models.Sequelize;
let op = sequelize.Op;


const PERFIL_CONFIG_ERROR = {
    ERROR: {
        status: 500,
        message: 'Error al guardar el sensor '
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
    PERFIL_NOT_FOUND: {
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
        message: 'El sensor ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    PERFIL_REGISTERED: {
        status: 403,
        message: 'Sensor ya existe'
    }
}

function PerfilConfigError(error) {
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
                    lote: {
                    [op.substring]: busqueda
                  }
                }
              }
            let response = await Produccion.findAll({
                order: [['idproduccion','DESC']],
                limit: 10,
                attributes: ['idproduccion', 'Fecha', 'Cantidad', 'Intervalo','lote'],
                where: query,

            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new PerfilConfigError(PERFIL_CONFIG_ERROR.PERFIL_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...PERFIL_CONFIG_ERROR.ERROR })
            }

        }
    },

    create: async function (req, res) {
        try {
            let response_new = new Produccion(req.body);
            const response = await response_new.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    delete: async function (req, res) {
        try {
            const response = await Produccion.destroy({
                where: { idproduccion: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Producto eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    update: async function (req, res) {
        try {
            const resp = await Produccion.update(req.body, {
                where: { idproduccion: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Producto modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    read: async function (req, res) {
        try {
            let response = await Producto.findOne({ where: { idproducto: req.params.id } });
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new PerfilConfigError(PERFIL_CONFIG_ERROR.PERFIL_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof PerfilConfigError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }
}