'use strict'

const Statuswo = require('../models').Statuswo;
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
            let statuswo = req.query.busqueda;
            if (statuswo != '') {
                query = {
                    idstatuswo: {
                        [op.substring]: statuswo
                    }
                }
            }
            let response = await Statuswo.findAll({
                attributes: ['idstatuswo','statuswo'],
                where: query

            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new (STATUSWO_ERROR.STATUSWO_NOT_FOUND)
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
            let nombre_statuswo = req.body.statuswo ;
            let statuswo = await Statuswo.findOne({ where: { statuswo: nombre_statuswo } });
            if (statuswo) {
                throw new StatuswoError(STATUSWO_ERROR.DUPLICATE);
            }
            let new_statuswo = new Statuswo(req.body);
            const response = await new_statuswo.save();
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
            const response = await Statuswo.destroy({
                where: { idstatuswo: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Contacto eliminadao', response })
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
            let statuswo = await Statuswo.update(req.body, {
                where: { idstatuswo: req.params.id }
            });
            res.status(200).send({ code: 200, message: 'Orden de Manufactura modificada', statuswo })
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
            let response = await Statuswo.findOne({

                where: { idstatuswo: req.params.id }

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
