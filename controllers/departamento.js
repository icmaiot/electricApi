'use strict'

const Departamento = require('../models').Departamento
const models = require('../models')
const sequelize = models.Sequelize;
const op = sequelize.Op;


const DEPARTAMENTO_ERROR = {
  ERROR: {
    status: 500,
    message: 'Error al guardar los cambios'
  },
  AUTH_FAILED: {
    status: 401,
    message: 'Fallo de autentificación',
    code: 'AUTH_FAILED'
  },
  DEPARTAMENTO_NOT_FOUND: {
    status: 404,
    message: 'Departamento no encontrado',
    code: 'DEPARTAMENTO_NOT_FOUND'
  },
  LIMIT: {
    status: 403,
    message: 'Límite alcanzado'
  },
  DUPLICATE: {
    status: 403,
    message: 'El departamento ya existe'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  DEPARTAMENTO_REGISTERED: {
    status: 403,
    message: 'El departamento ya se ha registrado'
  }
}

function DepartamentoError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {
  getDepartamentos: async function (req, res) {
    try {
      let query={};
      let departamento= req.query.busqueda;
      if(departamento != ''){
        query = {
          departamento:{
            [op.substring]:departamento
          }
        }
      }
      const depto = await Departamento.findAll({
        attributes: ['iddep', 'departamento', 'idcia'],
        where: query
      })
      if (depto) {
        res.status(200).send({
          code: 200, depto
        })
      } else {
        throw new DepartamentoError(DEPARTAMENTO_ERROR.DEPARTAMENTO_NOT_FOUND)
      }

    }
    catch (error) {
      console.error(error)
      if (error instanceof DepartamentoError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...DEPARTAMENTO_ERROR.ERROR })
      }

    }
  },

  createDepartamento: async function (req, res) {
    try {
      let departamento = await Departamento.findOne({attributes: ['iddep', 'departamento', 'idcia'], where:{departamento:req.body.departamento}});
      if(departamento){
        throw new DepartamentoError(DEPARTAMENTO_ERROR.DUPLICATE)
      }
      let new_depto = new Departamento(req.body);
      const response = await new_depto.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof DepartamentoError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  delete: async function (req, res) {
    try {
      const response = await Departamento.destroy({
        where: { iddep: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Departamento eliminado', response })
    } catch (error) {
      console.error(error)
      if (error instanceof DepartamentoError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  update: async function (req, res) {
    try {
      const resp = await Departamento.update(req.body, {
        where: { iddep: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Departamento modificado', resp })
    } catch (error) {
      console.error(error)
      if (error instanceof DepartamentoError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  readDepartamento:async function(req,res){
    try{
      let depto = await Departamento.findOne({where:{iddep:req.params.id}});
      if(depto){
        res.status(200).send({code:200,depto});
      }else{
        throw new DepartamentoError(DEPARTAMENTO_ERROR.DEPARTAMENTO_NOT_FOUND)
      }
    }catch(error){
      console.error(error)
      if (error instanceof DepartamentoError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  }
}