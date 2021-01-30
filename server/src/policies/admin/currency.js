const Joi = require('joi');

module.exports = {
  update(req, res, next) {
    Joi.validate(req.body, {
      currency: Joi.string().required(),
      autoUpdate: Joi.bool().valid(true, false).default(false),
    }, (error, value) => {
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
