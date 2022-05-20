
'use strict'

const Area = require('../models').Area
const models = require('../models')
const sequelize = models.Sequelize;
const op = sequelize.Op;


const AREA_ERROR = {
  ERROR: {
    status: 500,
    message: 'Error al guardar el área'
  },
  AUTH_FAILED: {
    status: 401,
    message: 'Auth Failed',
    code: 'AUTH_FAILED'
  },
  AREA_NOT_FOUND: {
    status: 404,
    message: 'Área no encontrada',
    code: 'AREA_NOT_FOUND'
  },
  LIMIT: {
    status: 403,
    message: 'Limit Reached'
  },
  DUPLICATE: {
    status: 403,
    message: 'El área ya existe'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  AREA_REGISTERED: {
    status: 403,
    message: 'El área ya existe'
  }
}

function AreaError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {
  getAreas: async function (req, res) {
    try {
      let query={};
      let busqueda= req.query.busqueda;
      if(busqueda != ''){
        query = {
          area:{
            [op.substring]:busqueda
          }
        }
      }
      const area = await Area.findAll({
        attributes: ['idarea', 'area', 'idcia'],
        where:query
      })
      if (area) {
        res.status(200).send({
          code: 200, area
        })
      } else {
        throw new AreaError(AREA_ERROR.AREA_NOT_FOUND)
      }

    }
    catch (error) {
      console.error(error)
      if (error instanceof AreaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...AREA_ERROR.ERROR })
      }

    }
  },

  createArea: async function (req, res) {
    try {
      let area = await Area.findOne({ attributes: ['idarea', 'area', 'idcia'], where: { area: req.body.area } });
      if (area) {
        throw new AreaError(AREA_ERROR.DUPLICATE)
      }
      let new_area = new Area(req.body);
      const response = await new_area.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof AreaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  delete: async function (req, res) {
    try {
      const response = await Area.destroy({
        where: { idarea: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Área eliminada', response })
    } catch (error) {
      console.error(error)
      if (error instanceof AreaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  update: async function (req, res) {
    try {
      const resp = await Area.update(req.body, {
        where: { idarea: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Área modificada', resp })
    } catch (error) {
      console.error(error)
      if (error instanceof AreaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  readArea: async function (req, res) {
    try {
      let area = await Area.findOne({ where: { idarea: req.params.id } });
      if (area) {
        res.status(200).send({ code: 200, area });
      } else {
        throw new AreaError(AREA_ERROR.AREA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof AreaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  }
}