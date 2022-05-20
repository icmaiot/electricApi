
'use strict'

const Produccionlote = require('../models').Produccionlote;
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
                    lote: {
                    [op.substring]: busqueda
                  }
                }
              }
            let response = await Produccionlote.findAll({
               // order: [['idproduccion','DESC']],
               // limit: 10,
                attributes: ['idproduccion', 'idmaquina', 'lote', 'Fecha', 'Cantidad', 'Intervalo','lote'],
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

    DataEncoder: async function (req, res) {
      console.log(req.body.topic)
      console.log(req.body.message)
      console.log(req)
    },

      getlote: async function (req, res) {
        try {
          let  tname = req.query.tname ;
          let  product = req.query.product ;
          let  cantidadpiezas = req.query.cantidadpiezas ;
          let  turdescanso = req.query.turdescanso ;
          const produccionlote =await _sequelize.query('CALL Produccionlote(:tname,:product,:cantidadpiezas,:turdescanso)',{replacements: { tname:tname,product:product,cantidadpiezas:cantidadpiezas,turdescanso:turdescanso}});
          if(produccionlote){
              res.status(200).send({code:200,produccionlote});
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

      getLotefinal: async function (req, res) {
        try {
            let lote = req.query.lote == '' ? '-1' : req.query.lote;
            const response =await _sequelize.query('CALL producciondatafinal(:lote)',{replacements: { lote: lote}});
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

      getpreparacion: async function (req, res) {
        try {
            let tname = req.query.tname == '' ? '-1' : req.query.tname;
            const progprod =await _sequelize.query('CALL preparacion(:tname)',{replacements: { tname: tname}});
          if(progprod){
              res.status(200).send({code:200,progprod});
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

      getBoard: async function (req, res) {
        try {
            let tmaquina = req.query.tmaquina == '' ? '-1' : req.query.tmaquina;
            const response =await _sequelize.query('CALL producciondataboard(:tmaquina)',{replacements: { tmaquina: tmaquina}});
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

      getDescanso: async function (req, res) {
        try {
            let lote = req.query.lote == '' ? '-1' : req.query.lote;
            const response =await _sequelize.query('CALL producciondataboarddescanso(:lote)',{replacements: { lote: lote}});
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

      getLoteActivo: async function (req, res) {
        try {
            let tmaquina = req.query.tmaquina == '' ? '-1' : req.query.tmaquina;
            const response =await _sequelize.query('CALL produccionloteactivo(:tmaquina)',{replacements: { tmaquina: tmaquina}});
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

      getData: async function (req, res) {
        try {
            let tlote = req.query.tlote == '' ? '-1' : req.query.tlote;
            let tname = req.query.tname == '' ? '-1' : req.query.tname;
            let tmaquina = req.query.tmaquina == '' ? '-1' : req.query.tmaquina;
            const response =await _sequelize.query('CALL producciondata(:tlote,:tname,:tmaquina)',{replacements: {tlote:tlote, tname:tname, tmaquina: tmaquina}});
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
            let response_new = new produccionlote(req.body);
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
            let idmaquina= req.query.idmaquina;
            let prioridad = req.query.prioridad;
            const response = await ProgProd.destroy({
                where: { idprogprod: req.params.id }
            })
            let progProd = await ProgProd.update({prioridad:sequelize.literal('prioridad -1')},
            {where:{
                idmaquina: idmaquina,
                prioridad:{
                    [op.gte]:prioridad
            } }})
            res.status(200).send({ code: 200, message: 'Producto eliminado', response })
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
            const resp = await ProgProd.update(req.body, {
                where: { idprogprod: req.params.id }
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