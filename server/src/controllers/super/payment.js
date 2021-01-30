const {Payment, User} = require('../../models');
const {statuses, statusesReverse} = require('../../helpers/payment-statuses');

module.exports.index = async function (req, res, next) {
  Payment.findAll({order: [['id', 'desc']]})
    .then((payments) => {
      res.json({
        statusCode: 200,
        status: true,
        data: payments,
        statuses: statuses,
        statusesReverse: statusesReverse,
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.show = async function (req, res, next) {
  Payment.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {model: User, as: 'user'}
    ]
  })
    .then((payment) => {
      if (payment) {
        res.json({
          statusCode: 200,
          status: true,
          statuses: statuses,
          statusesReverse: statusesReverse,
          datum: payment,
        });
      } else {
        res.status(404).json({statusCode: 404, status: true, message: global.lang('Not Found!')});
      }
    })
    .catch((error) => next(error));
};
