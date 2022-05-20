'use strict'

const Evento = require('../models').Evento4
const models = require('../models')
const sequelize = models.Sequelize;
const op = sequelize.Op;
const moment = require('moment');


const EVENTO_ERROR = {
  ERROR: {
    status: 500,
    message: 'Something Went Wrong'
  },
  PASSWORD_FAIL:{
    status: 406,
    message: 'Password Failed',
    code: 'PASSWORD_FAILED'
  },
  AUTH_FAILED: {
    status: 401,
    message: 'Auth Failed',
    code: 'AUTH_FAILED'
  },
  EVENTO_NOT_FOUND: {
    status: 404,
    message: 'evento not Found',
    code: 'EVENTO_NOT_FOUND'
  },
  LIMIT: {
    status: 403,
    message: 'Limit Reached'
  },
  DUPLICATE: {
    status: 403,
    message: 'The evento already has an account'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  INVALID_EMAIL: {
    status: 403,
    message: 'Invalid Email',
    code: 'INVALID_EMAIL'
  },
  INVALID_PASSWORD: {
    status: 403,
    message: 'Invalid Password',
    code: 'INVALID_PASSWORD'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  EVENTO_REGISTERED: {
    status: 403,
    message: 'Evento already has registered'
  }
}

function EventoError(error) {
  const { status, message } = error
  this.status = status
  this.message = message
 
}

module.exports={
  getEventos: async function (req,res){
      try{    
        let maquina = req.query.maquina;
        let page = req.query.pagina;
        let pageSize = +req.query.paginaL;
        let offset_ = (page-1) * pageSize;
        let fechaFin = moment.utc(req.query.fin).local().format('YYYY-MM-DD HH:mm:ss');
        let fechaInicio = moment.utc(req.query.inicio).local().format('YYYY-MM-DD HH:mm:ss');
        const condicion ={
          maquina:maquina,
            [op.and]:{
             [op.or]: [{
               hri :{
                 [op.gte]:fechaInicio
               }
              },{
               paroi:{
                 [op.gte]:fechaInicio
               }
              }]
            },
              [op.or]: [{
               hrf :{
                 [op.lte]:fechaFin
               }
              },{
               parof:{
                 [op.lte]:fechaFin
               }
              }]
           } 
        const count = await Evento.count({
          where:condicion
        });   
        const evento = await Evento.findAll({
          offset: offset_,limit: pageSize,
           where:condicion
          })
        if (evento){
            res.status(200).send({code:200, evento, total: count});
        } else{
            throw new EventoError(EVENTO_ERROR.EVENTO_NOT_FOUND)
        }
      }
        catch (error) {
            console.error(error)
            if (error instanceof EventoError) {
              res.status(error.status).send(error)
            } else {
              res.status(500).send({ ...EVENTO_ERROR.ERROR })
        }
          
      }
  }
}