const Joi = require('joi');

module.exports = {
  updateAccount(req, res, next) {
    Joi.validate(req.body, {
      name: Joi.string().required(),
      phone: Joi.number().required(),
      email: Joi.string().email().required(),
    }, (error, value) => {
      if (error) {
        res.status(400).send({
          statusCode: 400,
          status: false,
          message: 'All field is required!',
          errors: error,
        });
      } else {
        next();
      }
    });
  },
  updatePassword(req, res, next) {
    Joi.validate(req.body, {
      currentPassword: Joi.string().required(),
      password: Joi.string().required(),
      passwordConfirm: Joi.string().required(),
    }, (error, value) => {
      if (error) {
        res.status(400).send({
          statusCode: 400,
          status: false,
          message: 'All field is required!',
          errors: error,
        });
      } else {
        next();
      }
    });
  },
  catchErrorLog(req, res, next) {
    Joi.validate(req.body, {
      error: Joi.string().required(),
      errorInfo: Joi.string().required(),
      time: Joi.number().required(),
    }, (error, value) => {
      if (error) {
        res.status(400).send({
          statusCode: 400,
          status: false,
          message: 'All field is required!',
          errors: error,
        });
      } else {
        next();
      }
    });
  },
};
