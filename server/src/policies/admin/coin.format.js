const Joi = require('joi');

const schema = {
  PS: Joi.number().allow('').required().default(0),
  I: Joi.number().allow('').required().default(0),
  C: Joi.string().required(),
  UF: Joi.string().allow('').optional(),
  TF: Joi.string().allow('').optional(),
  G1Hf: Joi.string().allow('').optional(),
  G12Hf: Joi.string().allow('').optional(),
  G24Hf: Joi.string().allow('').optional(),
  G7Df: Joi.string().allow('').optional(),
  // paribu
  PTlaf: Joi.string().allow('').optional(),
  PThbf: Joi.string().allow('').optional(),
  BPdf: Joi.string().allow('').optional(),
  PBdf: Joi.string().allow('').optional(),
  // btcturk
  BTlaf: Joi.string().allow('').optional(),
  BThbf: Joi.string().allow('').optional(),
  BBTdf: Joi.string().allow('').optional(),
  BBdf: Joi.string().allow('').optional(),
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
