
'use strict'

const ProgProd = require('../models').ProgProd;
const models = require('../models');
const SKU = require('../models').SKU;
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
    getprogprodwo: async function (req, res) {
        try {
          const progprodwo =await _sequelize.query('CALL progprodfwo();');
          if(progprodwo){
              res.status(200).send({code:200,progprodwo});
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
      getprogprodprod: async function (req, res) {
        try {
          let id = req.query.id;
          const progprod =await _sequelize.query('CALL progprodfprod(:id)',{replacements: { id: id}});
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
      getprogprodf: async function (req, res) {
        try {
            let idMaquina = req.query.idMaquina == '' ? '-1' : req.query.idMaquina ;
            let idEmpresa = req.query.idEmpresa == '' ? '-1' : req.query.idEmpresa;
            let idProducto = req.query.idProducto == '' ? '-1' : req.query.idProducto;
            const progprod =await _sequelize.query('CALL progprodf(:idEmpresa,:idMaquina,:idProducto)',{replacements: { idEmpresa: idEmpresa,idMaquina:idMaquina,idProducto:idProducto}});
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
      getprogprodprioridad: async function (req, res) {
        try {
          const progprodwo =await _sequelize.query('CALL progprodprioridad();');
          if(progprodwo){
              res.status(200).send({code:200,progprodwo});
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
            let response_new = new ProgProd(req.body);
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

    updateUp: async function (req, res) {
        try {
            let prioridad = req.body.prioridad;
            let idmaquina= req.body.idmaquina;
            prioridad --;
            let progProd = await ProgProd.update({prioridad:sequelize.literal('prioridad +1')},
            {where:{
                idmaquina: idmaquina,
                prioridad:prioridad
             }})
             let resp = await ProgProd.update({prioridad:sequelize.literal('prioridad - 1')},
             {where:{
                 idprogprod: req.params.id
              }})  
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
    updateDown:async function(req,res){
        try {
            let prioridad = req.body.prioridad;
            let idmaquina= req.body.idmaquina;
            prioridad ++;
            req.body.prioridad = prioridad;
            let progprod = await ProgProd.findOne({ where: { 
                idmaquina: idmaquina,
                prioridad: prioridad
             } });
            const resp = await ProgProd.update(req.body, {
                where: { idprogprod: req.params.id }
            })
             if(progprod){
                prioridad--;
             const response = await ProgProd.update(
                 {prioridad: prioridad}, {
                where: { idprogprod: progprod.idprogprod }
            })
            }   
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
    ,
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
    },
    updateStatus: async function (req, res) {
        try {
            let obj = req.body;
            //Solo una orden de la misma maquina puede tener status en ejecucion
            if(obj.idstatus === 0){
             let progprod = await ProgProd.findOne({ attributes: ['idmaquina', 'idwosub', 'idprogprod', 'prioridad'], where:
              { idmaquina: obj.idmaquina,idstatus:0 , 
                idprogprod:{ [op.not]: obj.idprogprod }} });
            if (progprod) {
                throw new Error(CONST_ERROR.DUPLICATE);
            } 
            }
            if(obj.idstatus === 2){
                let progprod = await ProgProd.findOne({ 
                    attributes: [
                        sequelize.fn('MAX', sequelize.col('prioridad'))
                     ],
                    where: { 
                    idmaquina: req.body.idmaquina
                 } });
                obj.prioridad = progprod.prioridad; 
            }
            const resp = await ProgProd.update(obj, {
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