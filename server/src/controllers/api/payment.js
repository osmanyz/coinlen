const {Payment, User} = require('../../models');
const {Op} = require('sequelize');
const log = require('../../helpers/log');
const coinbase = require('../../helpers/coinbase');
const {statuses, statusesReverse} = require('../../helpers/payment-statuses');

module.exports.list = async function (req, res, next) {
  Payment.findAll({
    where: {
      userId: req.user.id,
      type: {
        [Op.in] : [1, 2]
      }
    },
    order: [
      ['id', 'desc']
    ],
    include: [
      {model: User, as: 'user', attributes: ['id', 'name', 'email']}
    ]
  })
    .then((payments) => {
      res.json({
        statusCode: 200,
        status: true,
        statuses: statuses,
        statusesReverse: statusesReverse,
        data: payments,
      });
    })
    .catch((error) => {
      console.log(error);
      return next(error);
    });
};

module.exports.doPayment = async function (req, res, next) {
  const paymentCount = await Payment.count({where: {userId: req.user.id, status: 1}});

  let chargeData = {
    metadata: {
      paymentId: null,
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      userPremium: req.user.premium,
      userPremiumDate: req.user.premiumDate,
      userPremiumStatus: req.user.premiumStatus,
    },
    pricing_type: 'fixed_price',
    redirect_url: process.env.ECOMMERCE_COMPLETED_URL,
    cancel_url: process.env.ECOMMERCE_CANCEL_URL
  };

  if (paymentCount === 0) {
    chargeData.name = global.lang('Coinlen 50% Discount Premium Subscription Package');
    chargeData.description = global.lang('50% discount for premium subscription in the first month!');
    chargeData.local_price = {
      amount: 5.00,
      currency: 'USD'
    };
  } else {
    chargeData.name = global.lang('Coinlen Premium Subscription Package');
    chargeData.description = global.lang('Coinlen Monthly premium subscription package.');
    chargeData.local_price = {
      amount: 10.00,
      currency: 'USD'
    };
  }

  const payment = await Payment.create({
    name: chargeData.name,
    description: chargeData.description,
    status: statuses.started,
    price: chargeData.local_price.amount,
    currency: chargeData.local_price.currency,
    email: req.user.email,
    userId: req.user.id,
    oldPremium: req.user.premium,
    oldPremiumDate: req.user.premiumDate,
    oldPremiumStatus: req.user.premiumStatus,
    newPremium: null,
    newPremiumDate: null,
    newPremiumStatus: null,
    provider: 'coinbase',
    chargeId: null,
    charge: {},
  });

  chargeData.metadata.paymentId = payment.id;

  coinbase.Charge.create(chargeData, async function (error, charge) {
    if (error) {
      log({
        req: req,
        type: 'error',
        path: 'api',
        method: 'payment@doPayment',
        user: req.user,
        desc: String(error),
      });

      return res.status(500).json({statusCode: 500, status: false, message: error});
    }

    payment.chargeId = charge.id;

    if (typeof charge === 'object') {
      payment.charge = charge;
    }

    const save = await payment.save();

    if (!save) {
      log({
        req: req,
        type: 'error',
        path: 'api',
        method: 'payment@doPayment',
        user: req.user,
        desc: 'Payment is not saved!',
      });

      return res.status(500).json({statusCode: 500, status: false});
    }

    log({
      req: req,
      type: 'success',
      path: 'api',
      method: 'payment@doPayment',
      user: req.user,
      desc: 'Payment created!',
    });

    res.json({
      statusCode: 200,
      status: true,
      datum: payment,
    });
  });
};
