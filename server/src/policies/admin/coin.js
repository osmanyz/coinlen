const Joi = require('joi');

const schema = {
  N: Joi.string().required(),
  C: Joi.string().required(),
  I: Joi.number().allow('').required().default(0),
  PS: Joi.number().allow('').required().default(0),
};

module.exports = {
  create(req, res, next) {
    Joi.validate(req.body, schema, (error, value) => {
      if (error) {
        res.status(400)
          .send({
            statusCode: 400,
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
    Joi.validate(req.body, schema, (error, value) => {
      if (error) {
        res.status(400)
          .send({
            statusCode: 400,
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
