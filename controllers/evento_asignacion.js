'use strict'

const Evento_asignacion = require('../models').Evento_asignacion;
const Evento_registro = require('../models').Evento_registro;
const models = require('../models');
const sequelize = models.Sequelize;
const op = sequelize.Op;

const EVENTOCAUSA_ERROR = {
    ERROR: {
        status: 500,
        message: 'No se pudo guardar el sensor '
    },
    AUTH_FAILED: {
        status: 401,
        message: 'Auth Failed',
        code: 'AUTH_FAILED'
    },
    EVENTO_NOT_FOUND: {
        status: 404,
        message: 'No se pudo encontrar el sensor',
        code: 'EVENTOCAUSA_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'El Evento ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    EVENTO_REGISTERED: {
        status: 403,
        message: 'Evento ya existe'
    }
}

function EventoError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
}

module.exports = {
    get: async function (req, res) {
        try {
            let query = {};
            let id_evento = req.query.id_evento;
            let id_equipo = req.query.id_equipo;
            if (id_evento && id_equipo){
                query = {
                    id_evento: id_evento,
                    id_tipoequipo: id_equipo
                }
            }
            let response = await Evento_asignacion.findAll({
                attributes: ['id_tipoequipo','id_falla','id_evento'],
                where: query,
                include : [{
                    model: Evento_registro,
                    required: false,
                    attributes: ['id_falla','codigo_falla', 'descripcion_falla'],
                }]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new EventoError(EVENTOCAUSA_ERROR.EVENTO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...EVENTOCAUSA_ERROR.ERROR })
            }

        }
    },

    create: async function (req, res) {
        try {
           let asignar = await Evento_asignacion.findOne({
            attributes: ['id_tipoequipo','id_falla','id_evento'],
                where: {
                    [op.or]: [
                        {
                            id_tipoequipo: req.body.id_tipoequipo,
                            id_falla: req.body.id_falla,
                            id_evento: req.body.id_evento,
                        }]
                }
            });
            if (asignar) {
                throw new EventoError(EVENTOCAUSA_ERROR.DUPLICATE);
            }
            let response_new = new Evento_asignacion(req.body);
            const response = await response_new.save(); 
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.log(error)
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error)
                res.status(500).send({ code: 500, message: 'Error al asignar la opcion' })
            }
        }

        /*try {
           let response_new = new Evento_asignacion(req.body);
           const response = await response_new.save(); 
           res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error) 
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }*/
    },
    

    delete: async function (req, res) {
        try {
            let query = {};
            let id_equipo = req.query.id_tipoequipo;
            let id_falla = req.query.id_falla;
            let id_evento = req.query.id_evento;
            query = {
                id_tipoequipo: id_equipo,
                id_falla: id_falla,
                id_evento: id_evento,
            }
            const response = await Evento_asignacion.destroy({
                where: query,
            })
            res.status(200).send({ code: 200, message: 'Registro eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    update: async function (req, res) {
        try {
            let query = {};
            let id_equipo = req.params.id_equipo;
            let id_falla = req.params.id_falla;
            let id_evento = req.params.id_evento;
            query = {
                id_tipoequipo: id_equipo,
                id_falla: id_falla,
                id_evento: id_evento,
            }
            const resp = await Evento_asignacion.update(req.body, {
                where: query,
            })
            res.status(200).send({ code: 200, message: 'Registro modificado', resp })
        } catch (error) {
            console.error(error)
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    
}