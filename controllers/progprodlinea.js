'use strict'

const Progprodlinea = require('../models').Progprodlinea;
const preparacion = require('../models').preparacion;
const models = require('../models');
const SKU = require('../models').SKU;
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
    REGISTERED: {
        status: 403,
        message: 'Sensor ya existe'
    },
    NOT_MAQUINA:{
        status:403,
        message:'No hay máquinas asignadas para el producto'
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
                    idprogprodlinea: busqueda
                  
                }
              }
            let response = await Progprodlinea.findAll({
               // order: [['idproduccion','DESC']],
               // limit: 10,
                attributes: ['idprogprodlinea', 'idlineaprod', 'idturnoprodlinea', 'idskunow', 'idskunext', 'cant','statprodlinea','tipoprod'],
                where: query,

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

    sendLineaprod: async function (req, res) {
      console.log(req.body.topic)
      console.log(req.body.message)
      console.log(req)
    },

    getprogprodlinea: async function (req, res) {
        try {
          const response=await _sequelize.query('CALL progprodlineapantalla();');
          if(response){
              res.status(200).send({code:200,response});
          }else{
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

      getseleccionturno: async function (req, res) {
        try {
          const response=await _sequelize.query('CALL seleccion_turno();');
          if(response){
              res.status(200).send({code:200,response});
          }else{
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

      filtro: async function (req, res) {
        try {
            let idLinea = req.query.idLinea == '' ? '-1' : req.query.idLinea ;
            let idProducto = req.query.idProducto == '' ? '-1' : req.query.idProducto;
            const response =await _sequelize.query('CALL filtrolinea(:idLinea,:idProducto)',{replacements: {idLinea:idLinea,idProducto:idProducto}});
          if(response){
              res.status(200).send({code:200,response});
          }else{
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
      //produccion linea
      getRlinea: async function (req, res) {
        try {
            let idLote = req.query.idLote == '' ? '-1' : req.query.idLote ;
            const response =await _sequelize.query('CALL progprodrlinea(:idLote)',{replacements: {idLote:idLote}});
          if(response){
              res.status(200).send({code:200,response});
          }else{
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
      //se elimino, entonces referenciar def y scrap desde maquina con defsuma y scrapsuma
      getAcum: async function (req, res) {
        try {
            let lote = req.query.lote == '' ? '-1' : req.query.lote ;
            const response =await _sequelize.query('CALL prodlineadefscrap(:lote)',{replacements: {lote:lote}});
          if(response){
              res.status(200).send({code:200,response});
          }else{
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
            let response_new = new Progprodlinea(req.body);
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
            const response = await Progprodlinea.destroy({
                where: { idprogprodlinea: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Linea eliminada', response })
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
            const resp = await Progprodlinea.update(req.body, {
                where: { idprogprodlinea: req.params.id }
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
    }
}