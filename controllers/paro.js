'use strict'

const Paro = require('../models').Paro
const models = require('../models')


const PARO_ERROR = {
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
    PARO_NOT_FOUND: {
      status: 404,
      message: 'Paro not Found',
      code: 'PARO_NOT_FOUND'
    },
    LIMIT: {
      status: 403,
      message: 'Limit Reached'
    },
    DUPLICATE: {
      status: 403,
      message: 'The paro already has an account'
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
    PARO_REGISTERED: {
      status: 403,
      message: 'Paro already has registered'
    }
  }
  
  function ParoError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
   
  }

module.exports={
    getParos: async function (req,res){
        try{          
          const paro = await Paro.findAll({ })
          if (paro){
              res.status(200).send({
                paro
              })
          } else{
              throw new ParoError(PARO_ERROR.PARO_NOT_FOUND)
          }

        }
          catch (error) {
              console.error(error)
              if (error instanceof ParoError) {
                res.status(error.status).send(error)
              } else {
                res.status(500).send({ ...PARO_ERROR.ERROR })
          }
            
        }
    }
}