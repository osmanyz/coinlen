/**
 * Important note!
 *
 * Not in use.
 */

const coinbase = require('../../helpers/coinbase');
const redis = require('../../connect/redis');

module.exports.clear = function (req, res, next) {
  coinbase.Checkout.all({'order': 'desc'}, function (error, list) {
    list.forEach((cart) => {
      coinbase.Checkout.deleteById(cart.id, function (error, response) {
        if (error) {
          console.log(error);
          return next(error);
        }

        console.log(response);
      });
    });
  });

  res.json({
    statusCode: 200,
    status: true,
  });
};

module.exports.sync = function (req, res, next) {
  coinbase.Checkout.create({
    'name': 'Coinlen Donate',
    'description': 'Thank you for your donation.',
    'pricing_type': 'no_price',
    'requested_info': ['email']
  }, function (error, response) {
    if (error) {
      return next(error);
    }

    console.log('Created checkout via create method');
    console.log(response);

    redis.set('CHECKOUT_DONATION', JSON.stringify(response));
  });

  coinbase.Checkout.create({
    'name': 'Coinlen 50% Discount Premium Membership',
    'description': '50% discount for premium membership in the first month!',
    'local_price': {
      'amount': '5.00',
      'currency': 'USD'
    },
    'pricing_type': 'fixed_price',
    'requested_info': ['email']
  }, function (error, response) {
    if (error) {
      return next(error);
    }

    console.log('Created checkout via create method');
    console.log(response);

    redis.set('DISCOUNTED_PREMIUM_CHECKOUT_DATA', JSON.stringify(response));
  });

  coinbase.Checkout.create({
    'name': 'Coinlen Premium Membership',
    'description': 'Coinlen 10% premium membership package.',
    'local_price': {
      'amount': '10.00',
      'currency': 'USD'
    },
    'pricing_type': 'fixed_price',
    'requested_info': ['email']
  }, function (error, response) {
    if (error) {
      return next(error);
    }

    console.log('Created checkout via create method');
    console.log(response);

    redis.set('PREMIUM_CHECKOUT_DATA', JSON.stringify(response));
  });

  res.json({
    statusCode: 200,
    status: true,
  });
};
