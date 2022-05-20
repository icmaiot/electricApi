'use strict'

const Cia = require('../models').Cia
const models = require('../models')
const imageService = require('../services/image.service');
const fs = require('fs');
const path = require('path');

const CIA_ERROR = {
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
  CIA_NOT_FOUND: {
    status: 404,
    message: 'Cia not Found',
    code: 'CIA_NOT_FOUND'
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
  CIA_REGISTERED: {
    status: 403,
    message: 'CIA already has registered'
  }
}

function CiaError(error) {
  const { status, message } = error
  this.status = status
  this.message = message

}

module.exports = {
  getCias: async function (req, res) {
    try {
      const cia = await Cia.findAll()
      if (cia) {
        res.status(200).send({
          code: 200, cia
        })
      } else {
        throw new CiaError(CIA_ERROR.CIA_NOT_FOUND)
      }

    }
    catch (error) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        res.status(500).send({ ...CIA_ERROR.ERROR })
      }

    }
  },

  createCia: async function (req, res) {
    try {
      let nombre_cia = req.body.nombre;
      let cia = await Cia.findOne({ where: { nombre: nombre_cia } });
      if (cia) {
        throw new CiaError(CIA_ERROR.DUPLICATE);
      }
      let new_cia = new Cia(req.body);
      const response = await new_cia.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  createImage: async function (req, res) {
    try {
      let new_cia = new Cia(req.body);
      const response = await new_cia.save();
      res.status(200).send({ code: 200, status: response.status });
    } catch (error) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  readCia: async function (req, res) {
    try {
      let cia = await Cia.findOne({ where: { idcia: req.params.id } });
      if (cia) {
        res.status(200).send({ code: 200, cia });
      } else {
        throw new CiaError(CIA_ERROR.CIA_NOT_FOUND);
      }
    } catch (error) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },
  update: async function (req, res) {
    try {
      let cia = await Cia.update(req.body, {
        where: { idcia: req.params.id }
      });
      res.status(200).send({ code: 200, message: 'Cia modificada', cia })
    } catch (e) {
      console.error(error)
      if (error instanceof CiaError) {
        res.status(error.status).send(error)
      } else {
        console.log(error);
        res.status(500).send({ code: 500, message: 'Something Went Wrong' })
      }
    }
  },

  uploadNovelImage: async function (req, res) {
    const id = req.params.id;
    let cia = await Cia.findOne(req.body, {
      where: { idcia: req.params.id }
    }).then(cia => {
      imageService.uploadImage(cia, req.files).then((image) => {
        return res.status(200).send({ image: image });
      }).catch(err => {
        return res.status(500).send({ message: 'Ocurrio un error al subir la imagen' + err });
      });
    }).catch(err => {
      return res.status(500).send({ message: 'No existe la cia.' });
    });
  },

   getImage: async function (req, res) {
    const img_path ='./uploads/' + req.params.file_name;
    fs.stat(img_path, function(err, stats) {
        if (stats) {
            return res.status(200).sendFile(path.resolve(img_path));
        } else {
            return res.status(404).send({ message: 'No se encuentra la imagen' });
        }
    });
}
}