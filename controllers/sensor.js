
'use strict'

const Sensor = require('../models').Sensor;
const Maquina = require('../models').Maquina;
const Color = require('../models').Color;
const models = require('../models');
const sequelize = models.Sequelize;
let op = sequelize.Op;


const SENSOR_ERROR = {
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
  SENSOR_NOT_FOUND: {
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
  SENSOR_REGISTERED: {
    status: 403,
    message: 'Sensor ya existe'
  }
}

function SensorError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {
  getSensores: async function (req, res) {
    try {
      let query = {};
      let busqueda = req.query.busqueda;
      if (busqueda != '') {
        query = {
          sensor: {
            [op.substring]: busqueda
          }
        }
      }
      const sensor = await Sensor.findAll({
        attributes: ['idsensor', 'sensor', 'idmaquina', 'color', 'intermitente', 'tipo'],
        where: query,
        include: [{
          model: Maquina,
          required: true,
          attributes: ['idmaquina', 'maquina', 'descripcion']
        },
        {
          model:Color,
          required: true,
          attributes: ['idcolor', 'color', 'numcolor']
        }]
      })
      if (sensor) {
        res.status(200).send({
          code: 200, sensor
        })
      } else {
        throw new SensorError(SENSOR_ERROR.SENSOR_NOT_FOUND)
      }

    }
    catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...SENSOR_ERROR.ERROR })
      }

    }
  },

  createSensor: async function (req, res) {
    try {
      let nombre_sensor = req.body.sensor;
      let sensor = await Sensor.findOne({ attributes: ['idsensor', 'sensor', 'idmaquina', 'color', 'intermitente', 'tipo'], where: { sensor: nombre_sensor } });
      if (sensor) {
        throw new SensorError(SENSOR_ERROR.DUPLICATE);
      }
      let new_Sensor = new Sensor(req.body);
      const response = await new_Sensor.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  delete: async function (req, res) {
    try {
      const response = await Sensor.destroy({
        where: { idsensor: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Sensor eliminado', response })
    } catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  update: async function (req, res) {
    try {
      const resp = await Sensor.update(req.body, {
        where: { idsensor: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Sensor modificado', resp })
    } catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  readSensor: async function (req, res) {
    try {
      let sensor = await Sensor.findOne({ where: { idsensor: req.params.id } });
      if (sensor) {
        res.status(200).send({ code: 200, sensor });
      } else {
        throw new SensorError(SENSOR_ERROR.SENSOR_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof SensorError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  }
}