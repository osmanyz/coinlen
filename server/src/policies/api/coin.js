const Joi = require('joi');

const schema = {
  name: Joi.string().required(),
  coin: Joi.string().required(),
  symbol: Joi.string().required(),
  position: Joi.string().allow('').required().default(0),
};

module.exports = {
  create(req, res, next) {
    Joi.validate(req.body, schema, (error, value) => {
      if (error) {
        res.status(400).send({
          statusCode: 400,
          status: false,
          message: 'All Fields Required',
          error: error.details,
        });
      } else {
        next();
      }
    });
  },
  update(req, res, next) {
    Joi.validate(req.body, schema, (error, value) => {
      if (error) {
        res.send({
          statusCode: 400,
          status: false,
          message: 'All Fields Required',
          error: error.details,
        });
      } else {
        next();
      }
    });
  },
};
