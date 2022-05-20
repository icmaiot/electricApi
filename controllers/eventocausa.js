'use strict'

const Eventocausa = require('../models').Eventocausa;
const models = require('../models');
const sequelize = models.Sequelize;
let op = sequelize.Op;

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
        message: 'El Eevento ya existe'
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
            let eventocausa = req.query.busqueda;
            let equipo = req.query.equipo;
            if (eventocausa != '' && equipo != '') {
                query = {
                    idtipo: equipo,
                    Idevento: {
                        [op.substring]: eventocausa
                    },
                }
            }
            let response = await Eventocausa.findAll({
                attributes: ['IDeventofalla', 'idtipo','Idevento','Codfalla','Descfalla'],
                where: query,
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

    getEventos: async function (req, res) {
        try {
            let query = {};
            let evento = req.query.evento;
            if (evento != '') {
                query = {
                Idevento: evento
                }
            }
            let response = await Eventocausa.findAll({
                attributes: ['IDeventofalla', 'idtipo','Idevento','Codfalla','Descfalla'],
                where: query,
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
            let response_new = new Eventocausa(req.body);
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
        }
    },
    

    delete: async function (req, res) {
        try {
            const response = await Eventocausa.destroy({
                where: { IDeventofalla: req.params.id }
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
            const resp = await Eventocausa.update(req.body, {
                where: { IDeventofalla: req.params.id }
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
    
    read: async function (req, res) {
        try {
            let response = await Eventocausa.findOne({ where: { IDeventofalla: req.params.id } });
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new EventoError(EVENTOCAUSA_ERROR.EVENTO_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }
}