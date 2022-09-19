'use strict'

const Grafico_mant = require('../models').Grafico_mant;
const { query } = require('../models');
const models = require('../models');
const sequelize = models.Sequelize;
const op = sequelize.Op;
const _sequelize = models.sequelize;

const GRAFICA_ERROR = {
    ERROR: {
        status: 500,
        message: 'Something Went Wrong'
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
      AREA_NOT_FOUND: {
        status: 404,
        message: 'Grafica not Found',
        code: 'GRAFICA_NOT_FOUND'
      },
      LIMIT: {
        status: 403,
        message: 'Limit Reached'
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
      GRAFICA_REGISTERED: {
        status: 403,
        message: 'Grafica already has registered'
      }
}

function GraficaError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
}

module.exports = {
    get: async function (req, res) {
      try {
        // parte de db ignoro si va aqui la consultas,inser, deleta, etc.....
        let response = await Grafico_mant.findAll();
        //condicion de respuesta null
        if(response) {
          res.status(200).send({ code: 200, response });
        } else {
          throw new GraficaError(GRAFICA_ERROR.AREA_NOT_FOUND);
        }
        // fallo total
      } catch (error) {
        console.error(error)
        if(error instanceof GraficaError) {
          res.status(error.status).send(error);
        } else {
          console.log(error);
          res.status(500).send({ code: 500, message: 'Something Went Wrong' });
        }
      }
    },
    
    getConsul: async function (req, res) {
      let maq = req.query.maq;
      let r1 = req.query.rango1;
      let r2 = req.query.rango2;
      try{
          const response = await _sequelize.query('CALL grafo_mats(:maq, :r1, :r2 )', 
              {replacements: {maq, r1,  r2}});
          if(response){
                res.status(200).send({ code:200, response });
          }else{
                throw new GraficaError(GRAFICA_ERROR.AREA_NOT_FOUND);
          }
      }catch(error){
        console.error(error)
        if (error instanceof GraficaError) {
          res.status(error.status).send(error);
        }else{
          console.log(error);
          res.status(500).send({code: 500, message: 'Something Went Wrong'});
        }
      }
    },

    getMaq: async function (req, res){
      try { 
        let response = await Grafico_mant.findAll({
          /// distinct 
          attributes: ['maquina'],
          group:['maquina'],
        });
        if(response) {
          res.status(200).send({ code: 200, response });
        } else {
          throw new GraficaError(GRAFICA_ERROR.AREA_NOT_FOUND);
        }
      } catch (error) {
        console.error(error)
        if(error instanceof GraficaError) {
          res.status(error.status).send(error);
        } else {
          console.log(error);
          res.status(500).send({ code: 500, message: 'Something Went Wrong' });
        }
      }
    },

    getCausa: async function (req, res){
      let causa = req.query.causa;
      let ma = req.query.ma;
      let r1 = req.query.rango1;
      let r2 = req.query.rango2;
  
      try{
        const response = await _sequelize.query('CALL causa_mats(:causa, :ma, :r1, :r2)', 
          {replacements: {causa, ma, r1, r2}});
        if(response){
          res.status(200).send({ code: 200, response });
        } else {
          throw new GraficaError(GRAFICA_ERROR.AREA_NOT_FOUND);
        }
      }catch(error){
        console.error(error)
        if(error instanceof GraficaError){
          res.status(error.status).send(error);
        } else {
          console.log(error);
          res.status(500).send({ code: 500 , message: 'Something Went Wrong' });
        }
      }
    }

  /*getGraficaMats: async function (res){
        try {
//const response = await sequelize.query('CALL table_jhin()');
            if(response){
                res.status(200).send({ code: 200, response});
            } else {
                throw new GraficaError(GRAFICA_ERROR.AREA_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof GraficaError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...GRAFICA_ERROR.ERROR})
            }
        }
    },*/
}