
'use strict'

const Um = require('../models').Um;
const Empresa = require('../models').Empresa;
const models = require('../models');
const Producto = require('../models').Producto;
const Progprodlinea = require('../models').Progprodlinea;
const sequelize = models.Sequelize;
const _sequelize = models.sequelize;
let op = sequelize.Op;


const PERFIL_CONFIG_ERROR = {
    ERROR: {
        status: 500,
        message: 'No se pudo guardar el sensor '
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
        message: 'No se pudo encontrar el sensor',
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
                    producto: {
                    [op.substring]: busqueda
                  }
                }
              }
            let response = await Producto.findAll({
                attributes: ['idproducto', 'producto', 'desc_producto', 'te_producto','idempresa', 'intervalo_tm','ciclo_producto','activo_producto', 'dolar_minuto'],
                where: query && {activo_producto : '1'},
                include: [{
                    model: Um,
                    required: false,
                },{
                    model:Empresa,
                    required:false,
                } ],
                order: [[Empresa,'nomemp', 'asc']]
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

    get2: async function (req, res) {
        try {
            let query = {};
            let emp = req.query.emp;
            if (emp != '') {
                query = {
                    idempresa: emp
                }
            }
            let response = await Producto.findAll({
                attributes: ['idproducto', 'producto', 'desc_producto', 'te_producto', 'idempresa', 'um_producto','intervalo_tm','ciclo_producto','dolar_minuto'],
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

    VerificaProdlinea: async function (req, res) {
        try {
            let query = {};
            let idproducto = req.query.idproducto;
            
            let response = await Producto.findAll({
                attributes: ['idproducto'],
                limit: 2,
                include: [{
                    model: Progprodlinea,
                    required: true,
                    where: {
                        idskunow: idproducto
                    }
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

    MaquinaByProducto: async function (req, res) {
     try {
        let idproducto = req.query.idproducto == '' ? '-1' : req.query.idproducto;
        const response=await _sequelize.query('CALL MaquinaByProducto(:idproducto)',{replacements: {idproducto:idproducto}});
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
            let response_new = new Producto(req.body);
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
            const response = await Producto.destroy({
                where: { idproducto: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Producto eliminado', response })
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
            const resp = await Producto.update(req.body, {
                where: { idproducto: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Producto modificado', resp })
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
            let response = await Producto.findOne({ where: { idproducto: req.params.id } });
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