var nodemailer = require("nodemailer");
var express = require("express");
var app = express();

const noReplyFromUser = process.env.noReplyFromUser;
const noReplyEmailUser = process.env.noReplyEmailUser;
const noReplyEmailPass = process.env.noReplyEmailPass;

const transporter = nodemailer.createTransport({
  host: 'crowli900@gmail.com',
  port: 587,
  auth: {
      user: noReplyEmailUser,
      pass: noReplyEmailPass
  }
});

transporter.use('compile', hbs({
  viewEngine: 'express-handlebars',
  viewPath: './views/'
}));

const mailOptions = {
  from: noReplyEmailUser,
  to: req.body.user_email,
  subject: 'Skynovels: Restablecer contraseña',
  text: 'haz click en el enlace para reiniciar tu contraseña de Skynovels! ' + applicationURL + '/nueva-contrasena/' + token_data.token,
  context: {
      token: applicationURL + '/nueva-contrasena/' + token_data.token,
      user: user.user_login,
      year: new Date().getFullYear()
  },
  template: 'passwordResetRequest'
};

transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
      return res.status(500).send({ message: 'Error al enviar el correo ' + err });
  } else {
      return res.status(200).send({ message: 'Email enviado con exito' });
  }
});

app.listen(3000, () => {

});


