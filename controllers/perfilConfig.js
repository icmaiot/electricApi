'use strict'

const PerfilConfig = require('../models').PerfilConfig;
const ConfiguracionModulo = require('../models').ConfiguracionModulo
const models = require('../models');
const Evento = require('../models').Evento;
const sequelize = models.Sequelize;
let op = sequelize.Op;


const PERFIL_CONFIG_ERROR = {
    ERROR: {
        status: 500,
        message: 'No se pudo guardar el sensor '
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
        message: 'No se pudo encontrar el sensor',
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
                    nombreperfil: {
                    [op.substring]: busqueda
                  }
                }
              }
            let perfilConfig = await PerfilConfig.findAll({
                attributes: ['idperfil', 'nombreperfil', 'descripcion', 'automanual'],
                where: query,
                include: [{
                    model: ConfiguracionModulo,
                    required: false,
                    include: [
                        {
                            model: Evento,
                            require: false,
                            attributes: ['idevento', 'evento', 'color']
                        }
                    ],
                    order: [
                        ['entrada', 'DESC']
                    ]
                }]
            })
            if (perfilConfig) {
                res.status(200).send({
                    code: 200, perfilConfig
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
            console.log(req.body)
            let new_perfil = new PerfilConfig(req.body);
            const response = await new_perfil.save();
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
            const response = await PerfilConfig.destroy({
                where: { idperfil: req.params.id }
            })
            const responseConfiguracion = await ConfiguracionModulo.destroy({
                where: { idperfil: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Perfil configuración eliminado', response })
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
            const resp = await PerfilConfig.update(req.body, {
                where: { idperfil: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Perfil configuración modificado', resp })
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
            let perfilConfig = await PerfilConfig.findOne({ where: { idperfil: req.params.id } });
            if (perfilConfig) {
                res.status(200).send({ code: 200, perfilConfig });
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