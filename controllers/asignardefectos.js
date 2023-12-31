'use strict'

const Asignardefectos = require('../models').Asignardefectos;
const Registrodefectos = require('../models').Registrodefectos;
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
                    idproducto: busqueda
                }
            }
            let response = await Asignardefectos.findAll({
                attributes: ['idproducto', 'iddefreg'],
                where: query,
                include: [{
                    model: Registrodefectos,
                    required: false,
                    attributes: ['iddefreg', 'descripcion_defecto'],
                }]
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

    create: async function (req, res) {
        try {
            const idproducto = req.body.idproducto;
            const iddefreg = req.body.iddefreg;
            const promises = iddefreg.map(def => Asignardefectos.create({ idproducto, iddefreg: def }));
            const response = await Promise.all(promises);
            // console.log(req.body)
            // let response_new = new Asignardefectos(req.body);
            // const response = await response_new.save();
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
            let query = {};
            let idp = req.query.idp;
            let idd = req.query.idd;
            query = {
                idproducto: idp,
                iddefreg: idd,
            }
            const response = await Asignardefectos.destroy({
                where: query,
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
            let query = {};
            let iddefgreg = req.query.iddefgreg;
            let idproducto = req.query.idproducto;
            query = {
                iddefgreg: iddefgreg,
                idproducto: idproducto,
            }
            const resp = await Asignardefectos.update(req.body, {
                where: query,
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