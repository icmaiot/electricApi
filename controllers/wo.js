'use strict'
const Wo = require('../models').Wo;
const Empresa = require('../models').Empresa;
const Contemp = require('../models').Contemp;
const Usuario = require('../models').Usuario;
const Statuswo = require('../models').Statuswo;
const models = require('../models');
const sequelize = models.Sequelize;
const op = sequelize.Op;


const WO_ERROR = {
    ERROR: {
        status: 500,
        message: 'Error al guardar los cambios'
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
    WO_NOT_FOUND: {
        status: 404,
        message: 'Contacto no encontrado',
        code: 'WO_NOT_FOUND'
    },
    LIMIT: {
        status: 403,
        message: 'Limit Reached'
    },
    DUPLICATE: {
        status: 403,
        message: 'El contacto ya existe'
    },
    CODE_INVALID: {
        status: 403,
        message: 'Invalid Reference Code'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    WO_REGISTERED: {
        status: 403,
        message: 'El contacto ya existe'
    }
}

function WoError(error) {
    const { status, message } = error
    this.status = status
    this.message = message

}

module.exports = {

    get: async function (req, res) {
        try {
            let query = {};
            let wo = req.query.busqueda;
            if (wo != '') {
                query = {
                    idwo: {
                        [op.substring]: wo
                    }
                }
            }
            let response = await Wo.findAll({
                attributes: ['idwo', 'woasig', 'idempresa', 'idcontacto', 'idempleado', 'fechasol', 'ocliente', 'idstatuswo','fechavenoc'],
                where: query,
                include: [
                    {
                        model: Empresa,
                        required: true,
                        attributes: ['idempresa', 'nomemp'],
                    },
                    {
                        model: Contemp,
                        required: true,
                        attributes: ['idcontemp', 'nomcontemp'],
                    },
                    {
                        model: Usuario,
                        required: true,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: Statuswo,
                        required: true,
                        attributes: ['idstatuswo', 'statuswo'],
                    },
                    
                ]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new WoError(WO_ERROR.WO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...WO_ERROR.ERROR })
            }

        }
    },

    getE: async function (req, res) {
        try {
            let query = {};
            
            let woe = req.query.woe;
           if (woe != '') {
                query = {
                    idempresa: woe

                }
            }
            let response = await Wo.findAll({
                attributes: ['idwo', 'woasig', 'idempresa', 'idcontacto', 'idempleado', 'fechasol', 'ocliente', 'idstatuswo', 'fechavenoc'],
                where: query,
                include: [
                    {
                        model: Empresa,
                        required: true,
                        attributes: ['idempresa', 'nomemp'],
                    },
                    {
                        model: Contemp,
                        required: true,
                        attributes: ['idcontemp', 'nomcontemp'],
                    },
                    {
                        model: Usuario,
                        required: true,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: Statuswo,
                        required: true,
                        attributes: ['idstatuswo', 'statuswo'],
                    },

                ]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new WoError(WO_ERROR.WO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...WO_ERROR.ERROR })
            }

        }
    },
    get2: async function (req, res) {
        try {
            let query = {};
            let busqueda = req.query.busqueda;
            const contacto = req.query.contacto;
            const empleado = req.query.empleado;
            const status = req.query.status;
            const orden = req.query.orden;
            const registro = req.query.registro;
            const vencimiento = req.query.vencimiento;

            //Completa
            if (busqueda != '' && contacto != '' && empleado != '' && status != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    idempleado: empleado,
                    idcontacto: contacto,
                    idstatuswo: status,
                    ocliente: orden,
                    registro: registro,
                    vencimiento: vencimiento,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            //combinaciones de 6 (7)
            else if (busqueda != '' && contacto != '' && empleado != '' && status != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && empleado != '' && status != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && empleado != '' && status != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && empleado != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    ocliente, orden,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && status != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente, orden,
                    idstatuswo: status,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && empleado != '' && status != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente, orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (contacto != '' && empleado != '' && status != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente, orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto,
                }
            }
            //combinaciones de 5 (21)
            // COMBINACION 5 //

            else if (busqueda != '' && contacto != '' && empleado != '' && status != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && empleado != '' && status != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && empleado != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && empleado != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && empleado != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && empleado != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            ///////////////////////
            else if (busqueda != '' && contacto != '' && status != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idstatuswo: status,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            //
            else if (busqueda != '' && contacto != '' && status != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idstatuswo: status,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            //
            else if (busqueda != '' && contacto != '' && status != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idstatuswo: status,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            //
            else if (busqueda != '' && contacto != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente, orden,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            //
            else if (busqueda != '' && empleado != '' && status != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '' && status != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '' && status != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente: orden,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && status != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente: orden,
                    idstatuswo: status,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (contacto != '' && empleado != '' && status != '' && orden != '' && registro != '') {
                query = {
                    idcontacto: contacto,
                    idempleado: empleado,
                    idstatuswo: status,
                    pocliente: orden,
                    fechasol: registro
                }
            }
            else if (contacto != '' && empleado != '' && status != '' && orden != '' && vencimiento != '') {
                query = {
                    idcontacto: contacto,
                    idempleado: empleado,
                    idstatuswo: status,
                    pocliente: orden,
                    fechavenoc: vencimiento
                }
            }
            else if (contacto != '' && empleado != '' && status != '' && registro != '' && vencimiento != '') {
                query = {
                    idcontacto: contacto,
                    idempleado: empleado,
                    idstatuswo: status,
                    fechasol: registro,
                    fechavenoc: vencimiento
                }
            }
            else if (contacto != '' && empleado != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    idcontacto: contacto,
                    idempleado: empleado,
                    ocliente, orden,
                    fechasol: registro,
                    fechavenoc: vencimiento
                }
            }
            else if (contacto != '' && status != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    idcontacto: contacto,
                    idstatuswo: status,
                    ocliente, orden,
                    fechasol: registro,
                    fechavenoc: vencimiento
                }
            }
            else if (empleado != '' && status != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    idempleado: empleado,
                    idstatuswo: status,
                    ocliente, orden,
                    fechasol: registro,
                    fechavenoc: vencimiento
                }
            }
            // Combinaciones de 4 (35)
            else if (busqueda != '' && contacto != '' && empleado != '' && status != '') {
                query = {
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && empleado != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && empleado != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && empleado != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && status != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idstatuswo: status,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && status != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idstatuswo: status,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idstatuswo: status,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && contacto != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && empleado != '' && status != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && empleado != '' && status != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && empleado != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && empleado != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && status != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idstatuswo: status,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && status != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idstatuswo: status,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && status != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idstatuswo: status,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (busqueda != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente: orden,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }

            else if (contacto != '' && empleado != '' && status != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto
                }
            }
            else if (contacto != '' && empleado != '' && status != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto
                }
            }
            else if (contacto != '' && empleado != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idstatuswo: status,
                    idempleado: empleado,
                    idcontacto: contacto
                }
            }

            else if (contacto != '' && empleado != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idempleado: empleado,
                    idcontacto: contacto
                }
            }
            else if (contacto != '' && empleado != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idempleado: empleado,
                    idcontacto: contacto
                }
            }

            else if (contacto != '' && empleado != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idempleado: empleado,
                    idcontacto: contacto
                }
            }

            else if (contacto != '' && orden != '' && status != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idstatuswo: status,
                    ocliente: orden,
                    idcontacto: contacto
                }
            }
            else if (contacto != '' && orden != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idstatuswo: status,
                    ocliente: orden,
                    idcontacto: contacto
                }
            }

            else if (contacto != '' && registro != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idstatuswo: status,
                    fechasol: registro,
                    idcontacto: contacto
                }
            }

            else if (contacto != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente: orden,
                    idcontacto: contacto
                }
            }

            else if (empleado != '' && status != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idstatuswo: status,
                    idcontacto: contacto
                }
            }
            else if (empleado != '' && status != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idstatuswo: status,
                    idempleado: empleado
                }
            }

            else if (empleado != '' && status != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idstatuswo: status,
                    idempleado: empleado
                }
            }
            else if (empleado != '' && orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    fechasol: registro,
                    idempleado: empleado
                }
            }

            else if (status != '' && status != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente: orden,
                    idstatuswo: status,
                }
            }



            //Combinaciones de 3 (35)
            else if (busqueda != '' && contacto != '' && empleado != '') {
                query = {
                    idempleado: empleado,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && status != '') {
                query = {
                    idstatuswo: status,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && contacto != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            ////////////////////////////////////////////////////////////////
            else if (busqueda != '' && empleado != '' && status != '') {
                query = {
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            ////////////////////////////////////////////////////////////////
            else if (busqueda != '' && status != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idstatuswo: status,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && status != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idstatuswo: status,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idstatuswo: status,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            ////////////////////////////////////////////////////////////////
            else if (busqueda != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            ////////////////////////////////////////////////////////////////
            else if (busqueda != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            ////////////////////////////////////////////////////////////////
            else if (contacto != '' && empleado != '' && status != '') {
                query = {
                    idstatuswo: status,
                    idempleado: empleado,
                    idempresa: contacto
                }
            }
            else if (contacto != '' && empleado != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idempleado: empleado,
                    idempresa: contacto
                }
            }
            else if (contacto != '' && empleado != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idempleado: empleado,
                    idempresa: contacto
                }
            }
            else if (contacto != '' && empleado != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idempleado: empleado,
                    idempresa: contacto
                }
            }

            ////////////////////////////////////////////////////////////////
            else if (contacto != '' && status != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idstatuswo: status,
                    idempresa: contacto
                }
            }
            else if (contacto != '' && status != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idstatuswo: status,
                    idempresa: contacto
                }
            }
            else if (contacto != '' && status != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idstatuswo: status,
                    idempresa: contacto
                }
            }

            ////////////////////////////////////////////////////////////////
            else if (contacto != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idempresa: contacto
                }
            }
            else if (contacto != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idempresa: contacto
                }
            }

            ////////////////////////////////////////////////////////////////

            else if (contacto != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idempresa: contacto
                }
            }
            ////////////////////////////////////////////////////////////////

            else if (status != '' && empleado != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idempleado: empleado,
                    idstatuswo: status
                }
            }
            else if (status != '' && empleado != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idempleado: empleado,
                    idstatuswo: status
                }
            }
            else if (status != '' && empleado != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idempleado: empleado,
                    idstatuswo: status
                }
            }

            ////////////////////////////////////////////////////////////////

            else if (empleado != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idempleado: empleado
                }
            }
            else if (empleado != '' && orden != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idempleado: empleado
                }
            }
            ////////////////////////////////////////////////////////////////

            else if (empleado != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    idempleado: empleado
                }
            }
            ////////////////////////////////////////////////////////////////
            else if (status != '' && orden != '' && registro != '') {
                query = {
                    fechasol: registro,
                    ocliente: orden,
                    idstatuswo: status
                }
            }
            else if (status != '' && empleado != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    ocliente: orden,
                    idstatuswo: status
                }
            }

            ////////////////////////////////////////////////////////////////

            else if (status != '' && vencimiento != '' && registro != '') {
                query = {
                    fechasol: registro,
                    fechavenoc: vencimiento,
                    idstatuswo: status
                }
            }
            else if (orden != '' && registro != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    fechasol: registro,
                    ocliente: orden
                }
            }
            ////////////////////////////////////////////////////////////////

            //Combinaciones de 2 (21)
            //empieza busqueda
            else if (busqueda != '' && contacto != '') {
                query = {
                    idcontacto: contacto,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && empleado != '') {
                query = {
                    idempleado: empleado,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && status != '') {
                query = {
                    idstatuswo: status,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            else if (busqueda != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            }
            //empieza contacto
            else if (contacto != '' && empleado != '') {
                query = {
                    idempleado: empleado,
                    idcontacto: contacto

                }
            }
            else if (contacto != '' && status != '') {
                query = {
                    idstatuswo: status,
                    idcontacto: contacto

                }
            }
            else if (contacto != '' && orden != '') {
                query = {
                    ocliente: orden,
                    idcontacto: contacto

                }
            }
            else if (contacto != '' && registro != '') {
                query = {
                    fechasol: registro,
                    idcontacto: contacto

                }
            }
            else if (contacto != '' && vencimiento != '') {
                query = {
                    fechavenoc: vencimiento,
                    idcontacto: contacto

                }
                //empleado
            } else if (empleado != '' && status != '') {
                query = {
                    idempleado: empleado,
                    idstatuswo: status

                }
            }
            else if (empleado != '' && orden != '') {
                query = {
                    idempleado: empleado,
                    ocliente: orden

                }
            } else if (empleado != '' && registro != '') {
                query = {
                    idempleado: empleado,
                    fechasol: registro

                }
            } else if (empleado != '' && vencimiento != '') {
                query = {
                    idempleado: empleado,
                    fechavenoc: vencimiento

                }
            }
            //status
            else if (status != '' && orden != '') {
                query = {
                    idstatus: status,
                    ocliente: orden

                }
            } else if (status != '' && registro != '') {
                query = {
                    idstatuswo: status,
                    fechasol: registro

                }
            }
            else if (status != '' && vencimiento != '') {
                query = {
                    idstatuswo: status,
                    fechavenoc: vencimiento

                }
            }
            //orden
            else if (orden != '' && registro != '') {
                query = {
                    ocliente: orden,
                    fechasol: registro

                }
            }
            else if (orden != '' && vencimiento != '') {
                query = {
                    ocliente: orden,
                    fechavenoc: vencimiento

                }
            }
            //registro
            else if (registro != '' && vencimiento != '') {
                query = {
                    fechasol: registro,
                    fechavenoc: vencimiento

                }
            }


            //Individuales
            else if (busqueda != '') {
                query = {
                    idempresa: {
                        [op.substring]: busqueda
                    }
                }
            } else if (contacto != '') {
                query = {
                    idcontacto:
                        contacto
                }

            } else if (empleado != '') {
                query = {
                    idempleado:
                        empleado
                }
            }
            else if (status != '') {
                query = {
                    idstatuswo:
                        status
                }
            }
            else if (orden != '') {
                query = {
                    ocliente:
                        orden
                }
            }
            else if (registro != '') {
                query = {
                    fechasol:
                        registro
                }
            }
            else if (vencimiento != '') {
                query = {
                    fechavenoc:
                        vencimiento
                }
            }
            let response = await Wo.findAll({
                attributes: ['idwo', 'woasig', 'idempresa', 'idcontacto', 'idempleado', 'fechasol', 'ocliente', 'idstatuswo', 'fechavenoc'],
                where: query,
                include: [
                    {
                        model: Empresa,
                        required: true,
                        attributes: ['idempresa', 'nomemp'],
                    },
                    {
                        model: Contemp,
                        required: true,
                        attributes: ['idcontemp', 'nomcontemp'],
                    },
                    {
                        model: Usuario,
                        required: true,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: Statuswo,
                        required: true,
                        attributes: ['idstatuswo', 'statuswo'],
                    },

                ]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new (WO_ERROR.WO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...WO_ERROR.ERROR })
            }

        }
    },

    get3: async function (req, res) {
        try {
            let query = {};
            let wo = req.query.busqueda;
            if (wo != '') {
                query = {
                    idcontacto: {
                        [op.substring]: wo
                    }
                }
            }
            let response = await Wo.findAll({
                attributes: ['idwo', 'woasig', 'idempresa', 'idcontacto', 'idempleado', 'fechasol', 'ocliente', 'idstatuswo', 'fechavenoc'],
                where: query,
                include: [
                    {
                        model: Empresa,
                        required: false,
                        attributes: ['idempresa', 'nomemp'],
                    },
                    {
                        model: Contemp,
                        required: false,
                        attributes: ['idcontemp', 'nomcontemp'],
                    },
                    {
                        model: Usuario,
                        required: false,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: Statuswo,
                        required: false,
                        attributes: ['idstatuswo', 'statuswo'],
                    },

                ]
            })
            if (response) {
                res.status(200).send({
                    code: 200, response
                })
            } else {
                throw new (WO_ERROR.WO_NOT_FOUND)
            }

        }
        catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                res.status(500).send({ ...WO_ERROR.ERROR })
            }

        }
    },
    create: async function (req, res) {
        try {
            let nombre_wo = req.body.ocliente ;
            let wo = await Wo.findOne({ where: { ocliente: nombre_wo } });
            if (wo) {
                throw new WoError(WO_ERROR.DUPLICATE);
            }
            let new_wo = new Wo(req.body);
            const response = await new_wo.save();
            res.status(200).send({ code: 200, status: response.status });
        } catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    delete: async function (req, res) {
        try {
            const response = await Wo.destroy({
                where: { idwo: req.params.id }
            })
            res.status(200).send({ code: 200, message: 'Contacto eliminadao', response })
        } catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },


    update: async function (req, res) {
        try {
            let wo = await Wo.update(req.body, {
                where: { idwo: req.params.id }
            });
            res.status(200).send({ code: 200, message: 'Orden de Manufactura modificada', wo })
        } catch (e) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    },

    read: async function (req, res) {
        try {
            let response = await Wo.findOne({

                where: { idwo: req.params.id },

                attributes: ['idwo', 'woasig', 'idempresa', 'idcontacto', 'idempleado', 'fechasol', 'ocliente', 'idstatuswo', 'fechavenoc'],

                include: [
                    {
                        model: Empresa,
                        required: false,
                        attributes: ['idempresa', 'nomemp'],
                    },
                    {
                        model: Contemp,
                        required: false,
                        attributes: ['idcontemp', 'nomcontemp'],
                    },
                    {
                        model: Usuario,
                        required: false,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: Statuswo,
                        required: false,
                        attributes: ['idstatuswo', 'statuswo'],
                    },
                    ]

            });
            if (response) {
                res.status(200).send({ code: 200, response });
            } else {
                throw new WoError(WO_ERROR.WO_NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
            if (error instanceof WoError) {
                res.status(error.status).send(error)
            } else {
                console.log(error);
                res.status(500).send({ code: 500, message: 'Something Went Wrong' })
            }
        }
    }

}
