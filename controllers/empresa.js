'use strict'

const Empresa = require('../models').Empresa
const Relcomp = require('../models').Relcomp
const models = require('../models')
const sequelize = models.Sequelize;
const _sequelize = models.sequelize;
let op = sequelize.Op;


const EMPRESA_ERROR = {
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
    EMPRESA_NOT_FOUND: {
        status: 404,
        message: 'Empresa not Found',
        code: 'EMPRESA_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'Register duplicated'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    EMPRESA_REGISTERED: {
        status: 403,
        message: 'EMPRESA already has registered'
    }
}

function EmpresaError(error) {
    const { status, message } = error
    this.status = status
    this.message = message
}

module.exports = {
    getEmpresa: async function (req, res) {
        try {
            let query = {};
            let empresa = req.query.busqueda;
            if (empresa != '') {
                query = {
                    idempresa: {
                        [op.substring]: empresa
                    }
                }
            }
           
            let response = await Empresa.findAll({
                attributes: ['idempresa', 'nomemp', 'nombcortemp', 'calleemp','activoemp'],
                where: query,
                include: [{
                    model: Relcomp,
                    required: false,
                    attributes: ['idrelcomercial', 'relcomercial'],
                }]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new EmpresaError(EMPRESA_ERROR.EMPRESA_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof EmpresaError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...EMPRESA_ERROR.ERROR })
            }

        }
    },

    getEmpresa2: async function (req, res) {
        try {
            let query = {};
            let empresa = req.query.busqueda;
            if(empresa != '') {
            query = {
                activoemp: {
                    [op.substring]: empresa
                      },
                }
              }
            let response = await Empresa.findAll({
                attributes: ['idempresa', 'nomemp', 'nombcortemp', 'calleemp', 'activoemp'],
                where: query,
                include: [{
                    model: Relcomp,
                    required: false,
                    attributes: ['idrelcomercial', 'relcomercial'],
                }]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new EmpresaError(EMPRESA_ERROR.EMPRESA_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof EmpresaError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...EMPRESA_ERROR.ERROR })
            }

        }
    },

    empai: async function (req, res) {
        try {
          const response = await _sequelize.query('CALL empai();');
          if (response) {
            res.status(200).send({ code: 200, response });
        } else {
            throw new EmpresaError(EMPRESA_ERROR.EMPRESA_NOT_FOUND);
        }
    }     catch (error) {
        console.error(error)
        if (error instanceof EmpresaError) {
            res.status(error.status).send(error)
        } else {
            res.status(500).send({ ...EMPRESA_ERROR.ERROR })
        }

    }
      },
 
    create: async function (req, res) {
        try {
            const empresa = await Empresa.findOne({
                where: {
                    [op.or]: [
                        {
                            nomemp: req.body.nomemp
                        }]
                }
            });
            if (empresa) {
                throw new EmpresaError(EMPRESA_ERROR.DUPLICATE);
            }
            let new_empresa = new Empresa(req.body);
            const response = await new_empresa.save();
            return res.send({success: "User has been added to database", code: 200});
           // res.status(200).send({ code: 200,  status: response.status});
        } catch (error) {
            console.error(error)
            if (error instanceof EmpresaError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    read: async function (req, res) {
        try {
            let empresa = await Empresa.findOne({ where: { idempresa: req.params.id } });
            if (empresa) {
                res.status(200).send({ code: 200, empresa });
            } else {
                throw new EmpresaError(EMPRESA_ERROR.EMPRESA_NOT_FOUND);
            }
        } catch (error) {
            console.error(error)
            if (error instanceof EmpresaError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
    update: async function (req, res) {
        try {
            let empresa = await Empresa.update(req.body, {
                where: { idempresa: req.params.id }
            });
            res.status(200).send({ code: 200, message: 'Empresa modificada', empresa })
        } catch (e) {
            console.error(error)
            if (error instanceof EmpresaError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    delete: async function (req, res) {
        try {
            const response = await Empresa.destroy({
                where: { idempresa: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Empresa eliminada', response })
        } catch (error) {
            console.error(error)
            if (error instanceof EmpresaError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },
}