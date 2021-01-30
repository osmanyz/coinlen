const Joi = require('joi');

module.exports = {
  check(req, res, next) {
    Joi.validate(req.body, {
      token: Joi.string().required(),
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
  login(req, res, next) {
    Joi.validate(req.body, {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      time: Joi.number().allow('').default(null),
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
  emailActivation(req, res, next) {
    Joi.validate(req.body, {
      code: Joi.string().required(),
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
  superLogin(req, res, next) {
    Joi.validate(req.body, {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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
  preRegister(req, res, next) {
    Joi.validate(req.body, {
      name: Joi.string().required(),
      agreement: Joi.string().required(),
      phone: Joi.string().length(10).regex(/^\d+$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      recaptcha: Joi.string().required(),
    }, (error, value) => {
      if (error) {
        res.status(400).send({
          statusCode: 400,
          status: false,
          message: global.lang('All field is required!'),
          errors: error,
        });
      } else if (value.agreement !== '1') {
        res.status(400).send({
          statusCode: 400,
          status: false,
          message: global.lang('All field is required!'),
          errors: error,
        });
      } else {
        next();
      }
    });
  },
};
