const nodemailer = require('nodemailer');

const mailer = nodemailer.createTransport({
  type: 'smtp',
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD,
  },
});

module.exports.sendEmail = function (options) {
  mailer.sendMail({
    from: 'Coinlen.com <no-reply@coinlen.com>',
    to: options.to,
    subject: options.subject,
    html: options.html,
  })
    .then((info) => {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    })
    .catch((error) => {
      console.error(error);
    });
};
