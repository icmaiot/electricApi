'use strict'

const Wosub = require('../models').Wosub;
const Producto = require('../models').Producto;
const Um = require('../models').Um;
const Statuswosub = require('../models').Statuswosub;

const models = require('../models');
const sequelize = models.Sequelize;
const op = sequelize.Op;


const STATUSWO_ERROR = {
    ERROR: {
        status: 500,
        message: 'Error al guardar los cambios'
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
    STATUSWO_NOT_FOUND: {
        status: 404,
        message: 'Status no encontrado',
        code: 'STATUSWO_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'El contacto ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    STATUSWO_REGISTERED: {
        status: 403,
        message: 'El contacto ya existe'
    }
}

function StatuswoError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {

    get: async function (req, res) {
        try {
            let query = {};
            let wosub = req.query.busqueda;
            if (wosub != '') {
                query = {
                    idwo: {
                        [op.substring]: wosub
                    }
                }
            }
            let response = await Wosub.findAll({
                attributes: ['idwosub', 'idwo', 'cantwosub', 'descwosub', 'idproducto', 'puwosub', 'descuentoemp', 'idstwosub','tipowosub'],
                where: query,
                include: [{
                    model: Producto,
                    required: false,
                    attributes: ['idproducto', 'producto', 'desc_producto', 'te_producto', 'um_producto'],

                    include: [{
                        model: Um,
                        required: false,
                        attributes: ['um'],
                    }]

                },
                {
                    model: Statuswosub,
                    required: false,
                    attributes: ['idstwosub', 'stwosub'],
                },

                ],
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new StatuswoError(STATUSWO_ERROR.STATUSWO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof StatuswoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...STATUSWO_ERROR.ERROR })
            }

        }
    },
    create: async function (req, res) {
        try {
            let nombre_wosub = req.body.idwosub;
            let wosub = await Wosub.findOne({ where: { idwosub: nombre_wosub } });
            if (wosub) {
                throw new StatuswoError(STATUSWO_ERROR.DUPLICATE);
            }
            let new_wosub = new Wosub(req.body);
            const response = await new_wosub.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof StatuswoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    delete: async function (req, res) {
        try {
            const response = await Wosub.destroy({
                where: { idwosub: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Orden eliminadana', response })
        } catch (error) {
            console.error(error)
            if (error instanceof StatuswoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },


    update: async function (req, res) {
        try {
            let wosub = await Wosub.update(req.body, {
                where: { idwosub: req.params.id }
            });
            res.status(200).send({ code: 200, message: 'Orden modificada', wosub })
        } catch (e) {
            console.error(error)
            if (error instanceof StatuswoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    read: async function (req, res) {
        try {
            let response = await Wosub.findOne({

                where: { idwosub: req.params.id }

            });
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new StatuswoError(STATUSWO_ERROR.STATUSWO_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof StatuswoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }

}