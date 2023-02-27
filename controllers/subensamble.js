
'use strict'

const Um = require('../models').Um;
const models = require('../models');
const Subensamble = require('../models').Subensamble;
const sequelize = models.Sequelize;
const _sequelize = models.sequelize;
let op = sequelize.Op;


const PERFIL_CONFIG_ERROR = {
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
    PERFIL_NOT_FOUND: {
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
                    desc_subens: {
                        [op.substring]: busqueda
                    }
                }
            }
            let response = await Subensamble.findAll({
                attributes: ['idsubens', 'subensamble','desc_subens','te_subens','um_subens'],
                where: query,
                include: [{
                    model: Um,
                    required: false,
                }]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
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

    MaquinaBySubensamble: async function (req, res) {
     try {
        let idsubens = req.query.idsubens == '' ? '-1' : req.query.idsubens;
        const response=await _sequelize.query('CALL MaquinaBySubensamble(:idsubens)',{replacements: {idsubens:idsubens}});
        if(response){
            res.status(200).send({code:200,response});
        }else{
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
            let response_new = new Subensamble(req.body);
            const response = await response_new.save();
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
            const response = await Subensamble.destroy({
                where: { idsubens: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Registro eliminado', response })
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
            const resp = await Subensamble.update(req.body, {
                where: { idsubens: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Registro modificado', resp })
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
            let response = await Raw.findOne({ where: { idraw: req.params.id } });
            if (response) {
                res.status(200).send({ code: 200, response });
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