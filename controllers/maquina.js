
'use strict'

const Maquina = require('../models').Maquina
const Area = require('../models').Area
const User = require('../models').Usuario
const TipoEquipo = require('../models').TipoEquipo
const ModuloInterfaz = require('../models').ModuloInterfaz
const models = require('../models')
const sequelize = models.Sequelize;
let op = sequelize.Op;
const _sequelize = models.sequelize;
var nodemailer = require("nodemailer");
//var hbs = require('nodemailer-express-handlebars');

const noReplyFromUser = process.env.noReplyFromUser;
const noReplyEmailUser = 'crowli900@gmail.com';
const noReplyEmailPass = process.env.noReplyEmailPass;


const MAQUINA_ERROR = {
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
  MAQUINA_NOT_FOUND: {
    status: 404,
    message: 'Máquina no encontrada',
    code: 'MAQUINA_NOT_FOUND'
  },
  LIMIT: {
    status: 403,
    message: 'Limit Reached'
  },
  DUPLICATE: {
    status: 403,
    message: 'La máquina ya existe'
  },
  CODE_INVALID: {
    status: 403,
    message: 'Invalid Reference Code'
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized'
  },
  MAQUINA_REGISTERED: {
    status: 403,
    message: 'La máquina ya existe'
  }
}

function MaquinaError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {


  sendEmail: async function (req, res) {
    const transporter = nodemailer.createTransport({
      host: 'mail.icma-ingenieria.com',
      port: 465,
      auth: {
          user: 'midas@icma-ingenieria.com',
          pass: 'icm110208mr0',
      },
      tls: {
        rejectUnauthorized: false
    }
    });
    
    // transporter.use('compile', hbs({
    //   viewEngine: 'express-handlebars',
    //   viewPath: './views/'
    // }));

    User.findOne({
      where: {
        activousr: '1',
      }
    }).then(user => {
      if (user) {
        const mailOptions = {
          from: 'midas@icma-ingenieria.com',
          to: req.body.email,
          subject: 'Paro en ' + req.body.maquina,
          text: 'Se ha parado la linea de producción a las: ' + req.body.paroi ,
        };
        transporter.sendMail(mailOptions, function (err, data) {
          if (err) {
            return res.status(500).send({ message: 'Error al enviar el correo ' + err});
          } else {
            return res.status(200).send({ code: 200, message: 'Correo enviado con exito' });
          }
        });
      } else {
        return res.status(404).send({ message: 'No existe usuario registrado con el correo electronico especificado' });
      }
    }).catch(err => {
      if (err.message.includes('Invalid value')) {
        return res.status(404).send({ message: 'No existe usuario registrado con el correo electronico especificado' });
      } else {
        return res.status(500).send({ message: 'Ocurrio algún error al enviar el correo, intentelo de nuevo' });
      }
    });
    // try {
    //     let perfil = new PerfilConfig(req.body);
    //     const response = await new_perfil.save();
    //     res.status(200).send({ code: 200, status: response.status });
    // } catch (error) {
    //     console.error(error)
    //     if (error instanceof PerfilConfigError) {
    //         res.status(error.status).send(error)
    //     } else {
    //         console.log(error);
    //         res.status(500).send({ code: 500, message: 'Something Went Wrong' })
    //     }
    // }
  },

  getMaquina: async function (req, res) {
    try {
      let query = {};
      let busqueda = req.query.busqueda;
      if (busqueda != '') {
        query = {
          idmaquina: busqueda

        }
      }
      const maquina = await Maquina.findAll({
        attributes: ['idmaquina', 'maquina', 'percent_calidad', 'oee', 'oee_global', 'idarea', 'Descripcion', 'idmodulo', 'tipoequipo', 'idrmt'],
        where: query,
      })
      if (maquina) {
        res.status(200).send({
          code: 200, maquina
        })
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    }
    catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }

    }
  },

  getLinea: async function (req, res) {
    try {
      let query = {};
      let busqueda = req.query.busqueda;
      if (busqueda != '') {
        query = {
          progprod: busqueda

        }
      }
      const response = await Maquina.findAll({
        attributes: ['idmaquina', 'progprod', 'maquina', 'idarea', 'Descripcion', 'idmodulo', 'tipoequipo', 'idrmt'],
        where: query,
      })
      if (response) {
        res.status(200).send({
          code: 200, response
        })
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    }
    catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }

    }
  },

  getMaquinaEjecucion: async function (req, res) {
    try {
      let query = {};
      let busqueda = req.query.busqueda;
      if (busqueda != '') {
        query = {
          progprod: busqueda
        }
      }
      const response = await Maquina.findAll({
        attributes: ['loteac', 'maquina', 'turnoac', 'percent_calidad', 'oee', 'oee_global', 'skuac', 'prodprogramada', 'prodesp', 'distan', 'delta', 'eficiencia', 'defsuma', 'scrapsuma', 'tmuerto', 'veloc'],
        where: query,
      })
      if (response) {
        res.status(200).send({
          code: 200, response
        })
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    }
    catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }

    }
  },

  getMaquinas: async function (req, res) {
    try {
      let query = {};
      let busqueda = req.query.busqueda;
      const area = req.query.area;
      if (busqueda != '' && area != '') {
        query = {
          idarea: area,
          maquina: {
            [op.substring]: busqueda
          }
        }
      }
      else if (busqueda != '') {
        query = {
          maquina: {
            [op.substring]: busqueda
          }
        }
      } else if (area != '') {
        query = { idarea: area }
      }
      const maquina = await Maquina.findAll({
        attributes: ['idmaquina', 'maquina', 'idarea', 'Descripcion', 'idmodulo', 'tipoequipo', 'idrmt'],
        where: query,
        include: [{
          model: Area,
          required: true,
          attributes: ['area', 'idarea']
        },
        {
          model: TipoEquipo,
          require: true,
          attributes: ['idtipo', 'tipoequipo']
        },
        {
          model: ModuloInterfaz,
          require: true,
          attributes: ['idmodulo', 'serial']
        }
        ]
      })
      if (maquina) {
        res.status(200).send({
          code: 200, maquina
        })
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    }
    catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }

    }
  },

  getHistorico: async function (req, res) {
    try {
      let idskunow = req.query.idskunow == '' ? '-1' : req.query.idskunow;
      let turnosel = req.query.turnosel == '' ? '-1' : req.query.turnosel;
      let fechaprep = req.query.fechaprep == '' ? '0000-00-00' : req.query.fechaprep;
      let fechaprep2 = req.query.fechaprep2 == '' ? '0000-00-00' : req.query.fechaprep2;
      const response = await _sequelize.query('CALL producciondatahistorico(:idskunow,:turnosel,:fechaprep,:fechaprep2);',
        { replacements: { idskunow: idskunow, turnosel: turnosel, fechaprep: fechaprep, fechaprep2: fechaprep2 } });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  filtroTm: async function (req, res) {
    try {
      let idskunow = req.query.idskunow == '' ? '-1' : req.query.idskunow;
      let turnosel = req.query.turnosel == '' ? '-1' : req.query.turnosel;
      let fechaprep = req.query.fechaprep == '' ? '0000-00-00' : req.query.fechaprep;
      let fechaprep2 = req.query.fechaprep2 == '' ? '0000-00-00' : req.query.fechaprep2;
      const response = await _sequelize.query('CALL P_filtro_tiemposmuertos(:idskunow,:turnosel,:fechaprep,:fechaprep2);',
        { replacements: { idskunow: idskunow, turnosel: turnosel, fechaprep: fechaprep, fechaprep2: fechaprep2 } });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },
  filtroScrap: async function (req, res) {
    try {
      let idskunow = req.query.idskunow == '' ? '-1' : req.query.idskunow;
      let turnosel = req.query.turnosel == '' ? '-1' : req.query.turnosel;
      let fechaprep = req.query.fechaprep == '' ? '0000-00-00' : req.query.fechaprep;
      let fechaprep2 = req.query.fechaprep2 == '' ? '0000-00-00' : req.query.fechaprep2;
      const response = await _sequelize.query('CALL P_filtro_scrap(:idskunow,:turnosel,:fechaprep,:fechaprep2);',
        { replacements: { idskunow: idskunow, turnosel: turnosel, fechaprep: fechaprep, fechaprep2: fechaprep2 } });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  filtroDefectos: async function (req, res) {
    try {
      let idskunow = req.query.idskunow == '' ? '-1' : req.query.idskunow;
      let turnosel = req.query.turnosel == '' ? '-1' : req.query.turnosel;
      let fechaprep = req.query.fechaprep == '' ? '0000-00-00' : req.query.fechaprep;
      let fechaprep2 = req.query.fechaprep2 == '' ? '0000-00-00' : req.query.fechaprep2;
      const response = await _sequelize.query('CALL P_filtro_defectos(:idskunow,:turnosel,:fechaprep,:fechaprep2);',
        { replacements: { idskunow: idskunow, turnosel: turnosel, fechaprep: fechaprep, fechaprep2: fechaprep2 } });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  getMaquinaLista: async function (req, res) {
    try {
      let idarea = req.query.idarea == '' ? '-1' : req.query.idarea;
      let idtipo = req.query.idtipo == '' ? '-1' : req.query.idtipo;
      const response = await _sequelize.query('CALL maquinalistapantalla(:idarea,:idtipo)', { replacements: { idarea: idarea, idtipo: idtipo } });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  getModuloInterfaz: async function (req, res) {
    try {
      const response = await _sequelize.query('CALL Modinterfazlista();');
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  getCorreos: async function (req, res) {
    try {
      let idmaquina = req.query.idmaquina;
      const response = await _sequelize.query('CALL PCorreos(:idmaquina)', { replacements: { idmaquina: idmaquina} });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  getInterfaz: async function (req, res) {
    try {
      let id_maquina = req.query.id_maquina;
      const response = await _sequelize.query('CALL P_ObtenerInterfaz(:id_maquina)', { replacements: { id_maquina: id_maquina} });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  getModuloRMT: async function (req, res) {
    try {
      const response = await _sequelize.query('CALL modrmtlista();');
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  PGraficaLinea: async function (req, res) {
    try {
      let fechaprep = req.query.fechaprep == '' ? '0000-00-00' : req.query.fechaprep;
      let fechaprep2 = req.query.fechaprep2 == '' ? '0000-00-00' : req.query.fechaprep2;
      let linea = req.query.linea == '' ? '-1' : req.query.linea;
      const response = await _sequelize.query('CALL P_TiempoYFechaXByTurno(:fechaprep,:fechaprep2,:linea);',
      { replacements: {fechaprep: fechaprep, fechaprep2: fechaprep2, linea:linea } });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  PGraficaOEE: async function (req, res) {
    try {
      let fechaprep = req.query.fechaprep == '' ? '0000-00-00' : req.query.fechaprep;
      let fechaprep2 = req.query.fechaprep2 == '' ? '0000-00-00' : req.query.fechaprep2;
      let idskunow = req.query.idskunow == '' ? '-1' : req.query.idskunow;
      const response = await _sequelize.query('CALL P_GraficaOEE(:fechaprep,:fechaprep2,:idskunow);',
      { replacements: {fechaprep: fechaprep, fechaprep2: fechaprep2, idskunow: idskunow } });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  PGraficaOEEGLOBAL: async function (req, res) {
    try {
      let fechaprep = req.query.fechaprep == '' ? '0000-00-00' : req.query.fechaprep;
      let fechaprep2 = req.query.fechaprep2 == '' ? '0000-00-00' : req.query.fechaprep2;
      let idskunow = req.query.idskunow == '' ? '-1' : req.query.idskunow;
      const response = await _sequelize.query('CALL P_GraficaOEE_GLOBAL(:fechaprep,:fechaprep2,:idskunow);',
      { replacements: {fechaprep: fechaprep, fechaprep2: fechaprep2, idskunow: idskunow} });
      if (response) {
        res.status(200).send({ code: 200, response });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...MAQUINA_ERROR.ERROR })
      }
    }
  },

  sendDescanso: async function (req, res) {
    console.log(req.body.topic)
    console.log(req.body.message)
    console.log(req)
  },

  createMaquina: async function (req, res) {
    try {
      let nombre_maquina = req.body.maquina;
      let maquina = await Maquina.findOne({ attributes: ['idmaquina', 'maquina', 'idarea', 'Descripcion', 'idrmt', 'tipoequipo'], where: { maquina: nombre_maquina } });
      if (maquina) {
        throw new MaquinaError(MAQUINA_ERROR.DUPLICATE);
      }
      let new_maquina = new Maquina(req.body);
      const response = await new_maquina.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  create: async function (req, res) {
    try {
      let new_perfil = new PerfilConfig(req.body);
      const response = await new_perfil.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof PerfilConfigError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  delete: async function (req, res) {
    try {
      const response = await Maquina.destroy({
        where: { idmaquina: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Máquina eliminada', response })
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  update: async function (req, res) {
    try {
      const resp = await Maquina.update(req.body, {
        where: { idmaquina: req.params.id }
      })
      res.status(200).send({ code: 200, message: 'Máquina modificada', resp })
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  readMaquina: async function (req, res) {
    try {
      let maquina = await Maquina.findOne({ where: { idmaquina: req.params.id } });
      if (maquina) {
        res.status(200).send({ code: 200, maquina });
      } else {
        throw new MaquinaError(MAQUINA_ERROR.MAQUINA_NOT_FOUND)
      }
    } catch (error) {
      console.error(error)
      if (error instanceof MaquinaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  }
}