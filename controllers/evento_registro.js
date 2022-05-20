'use strict'

const Evento_registro = require('../models').Evento_registro;
const Evento_asignacion = require('../models').Evento_asignacion;
const { query } = require('express');
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
            let busqueda = req.query.busqueda;
            if (busqueda) {
                query = {
                    id_falla: {
                        [op.substring]: busqueda
                    },
                }
            }
            let response = await busqueda.findAll({
                attributes: ['id_falla','id_evento','codigo_falla','descripcion_falla'],
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
        try{
            let new_falla = await Evento_registro.findOne({
                where: {
                    [op.or]: [
                        {
                            //id_evento: req.body.id_evento,
                            codigo_falla: req.body.codigo_falla,
                        },
                        {
                            descripcion_falla: req.body.descripcion_falla,
                        }
                    ]
                }
            });
            if (new_falla) {
                throw new EventoError(EVENTOCAUSA_ERROR.DUPLICATE);
            }
            let response_new = new Evento_registro(req.body);
            const response = await response_new.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.log(error)
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error)
                res.status(500).send({ code:500, message: 'Something Went Wrong'})
            }
        }
    },
    

    delete: async function (req, res) {
        try{
            /*preguntar si existen asignados*/ 
            let cranki = await Evento_asignacion.findOne({
                attributes: ['id_falla','id_evento'],
                where: {
                    [op.and]:[
                        {
                            id_falla: req.query.id_falla,
                            id_evento: req.query.id_evento,
                        }
                    ]
                }
            });
            
            if (cranki)  {
                throw new EventoError({...EVENTOCAUSA_ERROR.EVENTO_REGISTERED});
            }
            let query = {};
            let id_falla = req.query.id_falla;
            let id_evento = req.query.id_evento;
            let codigo_falla = req.query.codigo_falla;
            let descripcion_falla = req.query.descripcion_falla;
            query = {
                id_falla: id_falla,
                id_evento: id_evento,
                codigo_falla: codigo_falla,
                descripcion_falla: descripcion_falla,
            }
            const response = await Evento_registro.destroy({
                where: query,
            })
            res.status(200).send({ code: 200, message: 'Falla eliminada', response })
        } catch (error) {
            console.log(error)
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } 
             else {
                console.log(error)
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    update: async function (req, res) {
        try {
            let query = {};
            let id_evento = req.query.id_evento;
            let id_equipo = req.query.id_equipo;
            if(id_evento && id_equipo){
                query = {
                    id_evento: id_evento,
                    id_equipo: id_equipo
                }
            }

            const resp = await Evento_registro.update(req.body, {
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

    getEventoEquipo: async function (req, res) {
        try {
            let query = {};
            let id_evento = req.query.id_evento;
            let id_equipo = req.query.id_equipo;
            if (id_evento && id_equipo){
                query = {
                    id_evento: id_evento,
                    id_equipo: id_equipo
                }
            }
            const resp = await Evento_registro.findAll(req.body, {
                where: query,
            })
            res.status(200).send({ code: 200, message: 'Registro creado', resp })
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

    getEventoCatalago: async function (req, res){
        try {
            let query = {};
            let busq2 = req.query.busq2;
            if (busq2){
                query = {
                    id_evento: busq2
                }
            }
            let resp = await Evento_registro.findAll({
                attributes: ['id_falla','id_evento','codigo_falla','descripcion_falla'], 
                where: query,
            })
           
            if (resp) {
                res.status(200).send({
                    code:200, resp
                })
            } else {
                throw new EventoError(error)
            }
        }catch (error) {
            console.error(error)
            if (error instanceof EventoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...EVENTOCAUSA_ERROR.ERROR})
            }
        }
    }


}