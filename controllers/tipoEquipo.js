
'use strict'
const TipoEquipo = require('../models').TipoEquipo;
const models = require('../models');
const sequelize = models.Sequelize;

const TIPOEQUIPO_ERROR = {
    ERROR: {
        status: 500,
        message: 'No se pudo guardar el tipo de equipo '
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
        message: 'No se pudo encontrar el tipo de equipo',
        code: 'TIPO_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'El tipo de equipo ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    TIPO_REGISTERED: {
        status: 403,
        message: 'Tipo de equipo ya existe'
    }
}

function TipoError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {
    getTipoEquipos: async function (req, res) {
        try {
            const tipo_equipos = await TipoEquipo.findAll({
                attributes: ['idtipo', 'tipoequipo']
            })
            if (tipo_equipos) {
                res.status(200).send({ code: 200, tipo_equipos })
            } else {
                throw new TipoError(TIPOEQUIPO_ERROR.NOT_FOUND)
            }

        } catch (error) {
            console.error(error)
            if (error instanceof TipoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    createTipo: async function (req, res) {
        try {
            let tipo_equipo = await TipoEquipo.findOne({ attributes: ['idtipo', 'tipoequipo'], where: { tipoequipo: req.body.tipoequipo } })
            if (tipo_equipo) {
                throw new TipoError(TIPOEQUIPO_ERROR.DUPLICATE)
            }
            let new_eqipo = new TipoEquipo(req.body);
            const response = await new_eqipo.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof TipoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    delete: async function (req, res) {
        try {
            const response = await TipoEquipo.destroy({
                where: { idtipo: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Tipo de equipo eliminado', response })
        } catch (error) {
            console.error(error)
            if (error instanceof TipoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    update: async function (req, res) {
        try {
            const resp = await TipoEquipo.update(req.body,{
                where:{idtipo:req.params.id}
            })
            res.status(200).send({ code: 200, message: 'Tipo de equipo modificada', resp })

        } catch (error) {
            console.error(error)
            if (error instanceof TipoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    readTipo: async function (req, res) {
        try {
          let tipo = await TipoEquipo.findOne({ where: { idtipo: req.params.id } });
          if (tipo) {
            res.status(200).send({ code: 200, tipo });
          } else {
            throw new TipoError(TIPOEQUIPO_ERROR.NOT_FOUND)
          }
        } catch (error) {
          console.error(error)
          if (error instanceof TipoError) {
            res.status(error.status).send(error)
          } else {
            console.log(error);
            res.status(500).send({ code: 500, message: 'Something Went Wrong' })
          }
        }
      }

}
