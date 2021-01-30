const Joi = require('joi');

module.exports = {
  index(req, res, next) {
    Joi.validate(req.body, {
      page: Joi.number().required().default(1),
    }, (error, value) => {
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
};
