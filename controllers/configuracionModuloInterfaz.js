
'use strict'

const ConfiguracionModulo = require('../models').ConfiguracionModulo;
const Evento = require('../models').Evento;
const models = require('../models');
const sequelize = models.Sequelize;
let op = sequelize.Op;


const CONFIG_ERROR = {
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
    CONFIGURACION_NOT_FOUND: {
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
    CONFIGURACION_REGISTERED: {
        status: 403,
        message: 'Sensor ya existe'
    }
}

function ConfigModuloError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {
    get: async function (req, res) {
        try {
            //    attributes: ['idconfiguracion', 'entrada', 'tipoentrada', 'idevento','idperfil'],
            const configuracionModulo = await ConfiguracionModulo.findAll({
                include: [{
                    model: Evento,
                    require: true,
                    attributes: ['idevento', 'evento', 'color']
                }]
            })
            if (configuracionModulo) {
                res.status(200).send({
                    code: 200, configuracionModulo
                })
            } else {
                throw new ConfigModuloError(CONFIG_ERROR.PERFIL_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof ConfigModuloError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...CONFIG_ERROR.ERROR })
            }

        }
    },

    create: async function (req, res) {
        try {
            let listConfig = req.body;
            let response;
            listConfig.forEach(element => {
                let object = {
                    entrada: element.entrada,
                    tipoentrada: element.tipoentrada,
                    idevento: element.idevento,
                    idperfil: element.idperfil,
                    intermitente: element.intermitente
                }
                element.listEstacion.forEach(estacion => {
                    object[estacion.id] = estacion.checked;
                });
                console.log(object);
                let new_config = new ConfiguracionModulo(object);
                response = new_config.save();
            });

            //let new_config = new ConfiguracionModulo(req.body);
            // const response = await new_config.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof ConfigModuloError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    delete: async function (req, res) {
        try {
            const response = await ConfiguracionModulo.destroy({
                where: { idconfiguracion: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Perfil configuración eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof ConfigModuloError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    update: async function (req, res) {
        try {
            let listConfig = req.body;
            let response;
            listConfig.forEach(element => {
                let object = {
                    entrada: element.entrada,
                    tipoentrada: element.tipoentrada,
                    idevento: element.idevento,
                    idperfil: element.idperfil,
                    intermitente: element.intermitente
                }
                element.listEstacion.forEach(estacion => {
                    object[estacion.id] = estacion.checked;
                });
                response =  ConfiguracionModulo.update(object, {
                    where: { idconfiguracion: element.idconfiguracion }
                })
            });

            res.status(200).send({ code: 200, message: 'Perfil configuración modificado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof ConfigModuloError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    read: async function (req, res) {
        try {
            let listaconfig = await ConfiguracionModulo.findAll(
                { where: { idperfil: req.params.id } ,
                include: [{
                    model: Evento,
                    require: true,
                    attributes: ['idevento', 'evento', 'color']
                }],
                order: [
                    ['entrada', 'ASC']
                ]
            });
            if (listaconfig) {
                res.status(200).send({ code: 200, listaconfig });
            } else {
                throw new ConfigModuloError(CONFIG_ERROR.PERFIL_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof ConfigModuloError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }
}