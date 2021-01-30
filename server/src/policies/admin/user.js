const Joi = require('joi');

let schema = {
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  status: Joi.bool().valid(true, false).default(true),
  role: Joi.string().valid('user', 'admin').default('user'),
  premiumStatus: Joi.bool().allow('').default(false),
  premium: Joi.string().valid('trial', 'economic', 'premium', 'business').default('trial'),
  premiumDate: Joi.string().allow('').default(0),
};

module.exports = {
  create(req, res, next) {
    schema.password = Joi.string().required();

    Joi.validate(req.body, schema, (error, value) => {
      if (error) {
        res.status(400)
          .send({
            status: false,
            message: global.lang('All Fields Required'),
            error: error.details,
          });
      } else {
        next();
      }
    });
  },
  edit(req, res, next) {
    schema.password = Joi.string().allow('').optional();

    Joi.validate(req.body, schema, (error, value) => {
      if (error) {
        res.status(400)
          .send({
            status: false,
            message: global.lang('All Fields Required'),
            error: error.details,
          });
      } else {
        next();
      }
    });
  },
};
