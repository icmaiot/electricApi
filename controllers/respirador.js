'use strict'

const models = require('../models');
const sequelize = models.sequelize;

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
    getRespirador: async function (req, res) {
        try {
            const id = req.query.id;
            const respirador = await sequelize.query('CALL respiradoredorealp(:id)',
                { replacements: { id: id} });
            if (respirador) {
                res.status(200).send({ code: 200, respirador });
            } else {
                throw new GraficaError(GRAFICA_ERROR.AREA_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof GraficaError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...GRAFICA_ERROR.ERROR })
            }
        }
    }
}