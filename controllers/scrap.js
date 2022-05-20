'use strict'

const Scrap = require('../models').Scrap;
const Registroscrap = require('../models').Registroscrap;
const Usuario = require('../models').Usuario;
const models = require('../models');
const sequelize = models.Sequelize;
let op = sequelize.Op;
const _sequelize = models.sequelize;

const CONST_ERROR = {
    ERROR: {
        status: 500,
        message: 'No se pudo guardar el registro '
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
        message: 'No se pudo encontrar el sensor',
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
                    lotescrap: busqueda
                }
            }
            let response = await Scrap.findAll({
                attributes: ['Idacscrap', 'cantscrap', 'lotescrap', 'idscrapreg', 'idusuarios','idusuarioreg','idtipo_scrap'],
                where: query,
                include: [{
                    model: Registroscrap,
                    required: false,
                    attributes: ['idscrapreg', 'descripcion_scrap'],
                },{
                    model: Usuario,
                    required: false,
                    attributes: ['id', 'username', 'Username_last'],
               } ,
               {
                   model: Usuario,
                   as: 'usregs',
                   attributes: ['id', 'username', 'Username_last'],
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
    getScrapins: async function (req, res) {
        try {
            let tname = req.query.tname == '' ? '-1' : req.query.tname;
            let lote = req.query.lote == '' ? '-1' : req.query.lote;
            const response = await _sequelize.query('CALL scrapins(:tname,:lote)', { replacements: { tname: tname, lote: lote } });
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
            let response_new = new Scrap(req.body);
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
            const response = await Scrap.destroy({
                where: { Idacscrap: req.params.id }
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
            const resp = await Scrap.update(req.body, {
                where: { Idacscrap: req.params.id }
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