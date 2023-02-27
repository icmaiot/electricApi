
'use strict'

const SKU = require('../models').SKU;
const models = require('../models');
const Maquina = require('../models').Maquina;
const _sequelize = models.sequelize;
const sequelize = models.Sequelize;
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
        message: 'La máquina ya existe para este producto'
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
            const id = req.query.id;
            let response = await SKU.findAll(
                { where: { idproducto: id },
                include:[{
                    model: Maquina,
                    required: true,
                    attributes:['maquina']
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


    getProductosMaquina: async function (req, res) {
        try {
            let idmaquina = req.query.idmaquina == '' ? '-1' : req.query.idmaquina;
            const response = await _sequelize.query('CALL ProductosByEvento(:idmaquina)',
                {replacements: { idmaquina:idmaquina}});   
            if (response) {res.status(200).send({code: 200, response})
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

    getRmt: async function (req, res) {
        try {
            let  idmaquina = req.query.idmaquina == '' ? '-1' : req.query.idmaquina;
            const response =await _sequelize.query('CALL TomarRMT(:idmaquina)',
                {replacements: { idmaquina:idmaquina}});    
            if (response) {res.status(200).send({code: 200, response})
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

    sendProductosMaquina: async function (req, res) {
        console.log(req.body.topic)
        console.log(req.body.message)
        console.log(req)
      },

    create: async function (req, res) {
        try {
            let idmaquina= req.body.idmaquina;
            let idproducto = req.body.idproducto;
            let sku = await SKU.findOne({ where: { 
                idmaquina: idmaquina,
                idproducto:idproducto
             } });
             if(sku){
                throw new PerfilConfigError(PERFIL_CONFIG_ERROR.DUPLICATE)
             }
            let response_new = new SKU(req.body);
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
            let prioridad = req.query.prioridad;
            let idproducto = req.query.idproducto;
            const response = await SKU.destroy({
                where: { idskumaquina: req.params.id }
            })
            let skuList = await SKU.update({prioridad:sequelize.literal('prioridad -1')},
            {where:{
                idproducto: idproducto,
                prioridad:{
                    [op.gte]:prioridad
            }
            }})
            // select and increment 1  sku where prioridad > priodad and idproduct= idproduct
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
            const resp = await SKU.update(req.body, {
                where: { idskumaquina: req.params.id }
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
            let response = await SKU.findOne({ where: { idskumaquina: req.params.id } });
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