const log = require('../helpers/log');
const {Webhook, webhookSecret} = require('../helpers/coinbase');
const {Payment, User} = require('../models');
const {statuses, webhookStatuses} = require('../helpers/payment-statuses');
const completedEmail = require('../services/emails/payment/completed');
const pendingEmail = require('../services/emails/payment/pending');
const failedEmail = require('../services/emails/payment/failed');

module.exports.event = async function (req, res, next) {
  let webhook;

  try {
    if (typeof req.body === 'object') {
      req.body = JSON.stringify(req.body);
    }

    webhook = Webhook.verifyEventBody(req.body, req.headers['x-cc-webhook-signature'], webhookSecret);
  } catch (error) {
    log({
      req: req,
      type: 'error',
      path: 'webhook',
      method: 'webhook@listener',
      user: req.user,
      desc: error.message,
    });

    return res.status(400).send({
      statusCode: 400,
      status: false,
      message: error.message
    });
  }

  if (typeof webhook.data === 'undefined' || webhook.data === null || webhook.data === {}) {
    return metadataError(req, res);
  } else if (
    typeof webhook.data.metadata === 'undefined' ||
    webhook.data.metadata === null ||
    webhook.data.metadata === {}
  ) {
    return metadataError(req, res);
  } else if (typeof webhook.data.metadata.paymentId === 'undefined') {
    return metadataError(req, res);
  }

  const payment = await Payment.findOne({where: {id: webhook.data.metadata.paymentId}});
  if (!payment) {
    log({
      req: req,
      type: 'error',
      path: 'webhook',
      method: 'webhook@listener',
      user: req.user,
      desc: 'Payment Not Found!',
    });

    return res.status(400).send({
      statusCode: 400,
      status: false,
      message: 'Payment Not Found!',
    });
  }

  const user = await User.findByPk(payment.userId);
  if (!user) {
    log({
      req: req,
      type: 'error',
      path: 'webhook',
      method: 'webhook@listener',
      user: req.user,
      desc: 'user not found',
    });

    res.status(400).send('error');
  }

  switch (webhook.type) {
    case webhookStatuses.created:
      log({
        req: req,
        type: 'info',
        path: 'webhook',
        method: 'webhook@listener',
        user: req.user,
        desc: 'payment status created and sent an email',
      });

      if (payment.status !== statuses.created) {
        // email
      }

      payment.status = statuses.created;
      break;
    case webhookStatuses.confirmed:
      log({
        req: req,
        type: 'success',
        path: 'webhook',
        method: 'webhook@listener',
        user: req.user,
        desc: 'payment status confirmed and sent an email',
      });

      // updated user premium status
      user.payment = 'premium';
      // added one month
      user.paymentDate = new Date().setMonth(1);
      user.paymentStatus = true;
      user.save()
        .then(() => {
          // send mail to user and updated payment
          payment.newPremium = user.payment;
          payment.newPremiumDate = user.paymentDate;
          payment.newPremiumStatus = user.paymentStatus;

          if (payment.status !== statuses.confirmed) {
            completedEmail.confirmed(user, payment);
          }

          payment.status = statuses.confirmed;
        });
      break;
    case webhookStatuses.delayed:
      log({
        req: req,
        type: 'info',
        path: 'webhook',
        method: 'webhook@listener',
        user: req.user,
        desc: 'payment status delayed and sent an email',
      });

      payment.status = statuses.delayed;
      break;
    case webhookStatuses.pending:
      log({
        req: req,
        type: 'info',
        path: 'webhook',
        method: 'webhook@listener',
        user: req.user,
        desc: 'payment status pending and sent an email',
      });

      payment.status = statuses.pending;

      if (payment.status !== statuses.pending) {
        pendingEmail.pending(user, payment);
      }
      break;
    case webhookStatuses.resolved:
      log({
        req: req,
        type: 'info',
        path: 'webhook',
        method: 'webhook@listener',
        user: req.user,
        desc: 'payment status resolved and sent an email',
      });

      payment.status = statuses.resolved;
      break;
    // we're gonna use to instead of `statuses.failed`
    case webhookStatuses.failed:
      // send to user email about the fail
      log({
        req: req,
        type: 'info',
        path: 'webhook',
        method: 'webhook@listener',
        user: req.user,
        desc: 'payment status failed and sent an email',
      });

      if (payment.status !== statuses.failed) {
        failedEmail.failed(user, payment);
      }

      // send to user email about the fail
      payment.status = statuses.failed;
  }

  payment.save()
    .then(() => {
      return res.status(200).send({
        statusCode: 200,
        status: true,
        message: webhook.type,
      });
    })
    .catch((error) => {
      log({
        req: req,
        type: 'error',
        path: 'webhook',
        method: 'webhook@event',
        user: req.user,
        desc: error.message,
      });

      return next(error)
    });
};

function metadataError(req, res) {
  log({
    req: req,
    type: 'error',
    path: 'webhook',
    method: 'webhook@listener',
    user: req.user,
    desc: 'Payment Metadata Not Found!',
  });

  return res.status(400).send({
    statusCode: 400,
    status: false,
    message: 'Payment Metadata Not Found!',
  });
}

