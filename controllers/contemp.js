'use strict'
const Empresa = require('../models').Empresa;
const Wo = require('../models').Wo;

const Contemp = require('../models').Contemp;
const models = require('../models');
const sequelize = models.Sequelize;
const op = sequelize.Op;


const CONTEMP_ERROR = {
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
    CONTEMP_NOT_FOUND: {
        status: 404,
        message: 'Contacto no encontrado',
        code: 'CONTEMP_NOT_FOUND'
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
    CONTEMP_REGISTERED: {
        status: 403,
        message: 'El contacto ya existe'
    }
}

function ContempError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {

    getContemp: async function (req, res) {
        try {
            let query = {};
            let contemp = req.query.busqueda;
            if (contemp != '') {
                query = {
                    idempresa: {
                        [op.substring]: contemp
                    }
                }
            }
           
            let rescontemp = await Contemp.findAll({
                attributes: ['idcontemp', 'idempresa', 'nomcontemp', 'depcontemp', 'puestocontemp', 'pbxcontemp', 'extcontemp', 'movcontemp', 'emailcontemp','activocontemp'],
                where: query,

            })
            if (rescontemp) {
                res.status(200).send({
                    code: 200, rescontemp
                })
            } else {
                throw new ContempError(CONTEMP_ERROR.CONTEMP_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof ContempError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...CONTEMP_ERROR.ERROR })
            }

        }
    },

    getContemp2: async function (req, res) {
        try {
            let query = {};
            let contemp = req.query.busqueda;
            let activo = req.query.activoc;
            if (contemp != '' && activo != '') {
                query = {
                    activocontemp: activo,
                    idempresa: {
                        [op.substring]: contemp
                    },

                }
            }

            let rescontemp = await Contemp.findAll({
                attributes: ['idcontemp', 'idempresa', 'nomcontemp', 'depcontemp', 'puestocontemp', 'pbxcontemp', 'extcontemp', 'movcontemp', 'emailcontemp', 'activocontemp'],
                where: query,

            })
            if (rescontemp) {
                res.status(200).send({
                    code: 200, rescontemp
                })
            } else {
                throw new ContempError(CONTEMP_ERROR.CONTEMP_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof ContempError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...CONTEMP_ERROR.ERROR })
            }

        }
    },

    create: async function (req, res) {
        try {
            let nombre_contemp = req.body.idcontemp;
            let contemp = await Contemp.findOne({ where: { idcontemp: nombre_contemp } });
            if (contemp) {
                throw new ContempError(CONTEMP_ERROR.DUPLICATE);
            }
            let new_contemp = new Contemp(req.body);
            const response = await new_contemp.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof ContempError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    delete: async function (req, res) {
        try {
            const response = await Contemp.destroy({
                where: { idcontemp: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Contacto eliminadao', response })
        } catch (error) {
            console.error(error)
            if (error instanceof ContempError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    deleteall: async function (req, res) {
        try {
            const response = await Contemp.destroy({
                where: { idempresa: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Contactos eliminadao', response })
        } catch (error) {
            console.error(error)
            if (error instanceof ContempError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },


    update: async function (req, res) {
        try {
            let contemp = await Contemp.update(req.body, {
                where: { idcontemp: req.params.id }
            });
            res.status(200).send({ code: 200, message: 'Contacto modificado', contemp })
        } catch (e) {
            console.error(error)
            if (error instanceof ContempError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    updateS: async function (req, res) {
        try {
            let contemp = await Contemp.update(req.body, {
                where: { idempresa: req.params.id }
            });
            res.status(200).send({ code: 200, message: 'Contacto modificado', contemp })
        } catch (e) {
            console.error(error)
            if (error instanceof ContempError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    readContemp: async function (req, res) {
        try {
            let response = await Contemp.findOne({

                where: { idcontemp: req.params.id }

            });
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new ContempError(CONTEMP_ERROR.CONTEMP_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof ContempError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }

}
