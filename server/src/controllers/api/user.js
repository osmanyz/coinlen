const {User} = require('../../models');
const {Op} = require("sequelize");
const log = require('../../helpers/log');
const {check} = require('../../helpers/log');
const emailUA = require('../../services/emails/auth/update-account');
const emailPA = require('../../services/emails/auth/update-password');
const activateEmail = require('../../services/emails/auth/activation-for-email');

module.exports.updateAccount = function (req, res, next) {
  const user = User.findOne({where: {id: req.user.id}, role: 'user'});
  const findUser = User.findOne({
    where: {
      id: {[Op.ne]: req.user.id},
      email: {[Op.eq]: req.body.email},
    }
  });

  Promise.all([user, findUser])
    .then((responses) => {
      const user = responses[0];
      const findUser = responses[1];

      if (user === null || findUser) {
        return res.status(401).send({
          statusCode: 401,
          status: false,
          message: global.lang('Please enter a different email addresses!')
        });
      } else {
        emailUA.updateAccount(req.user);

        const account = req.user;
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.email = req.body.email;
        if (user instanceof User) {
          user.save();
        }

        log({
          req: req,
          type: 'success',
          path: 'api',
          method: 'user@updateAccount',
          user: user,
          desc: 'User account has been updated.',
        });

        return res.json({
          statusCode: 200,
          status: true,
          message: global.lang('Update successful.'),
          old_account: {
            name: account.name,
            phone: account.phone,
            email: account.email,
          },
          user: {
            status: user.status,
            name: user.name,
            email: user.email,
            phone: user.phone,
            premium: user.premium,
            premiumDate: user.premiumDate,
            premiumStatus: user.premiumStatus,
          },
        });
      }
    })
    .catch((error) => {
      log({
        req: req,
        type: 'error',
        path: 'api',
        method: 'user@updateAccount',
        user: req.user,
        desc: error.message,
      });
      console.log(error.message);
      return next(error);
    });
};

module.exports.updatePassword = async function (req, res, next) {
  User.findByPk(req.user.id)
    .then(async (user) => {
      const isPasswordValid = await user.comparePassword(req.body.currentPassword);

      if (!isPasswordValid) {
        return res.status(401).send({
          statusCode: 401,
          status: false,
          message: global.lang('The current password is wrong.')
        });
      }

      if (req.body.currentPassword === req.body.password) {
        return res.status(401).send({
          statusCode: 401,
          status: false,
          message: global.lang('The new password is the same as the current password.')
        });
      }

      if (req.body.password !== req.body.passwordConfirm) {
        return res.status(401).send({
          statusCode: 401,
          status: false,
          message: global.lang('The new password is not the same as the password confirm.')
        });
      }

      emailPA.updatePassword(user);
      user.password = req.body.password;
      user.save();

      log({
        req: req,
        type: 'success',
        path: 'api',
        method: 'user@updatePassword',
        user: user,
        desc: 'User password has been updated.',
      });

      res.json({
        statusCode: 200,
        status: true,
        message: global.lang('Update successful.'),
      });
    })
    .catch((error) => {
      log({
        req: req,
        type: 'error',
        path: 'api',
        method: 'user@updatePassword',
        user: req.user,
        desc: error.message,
      });

      return next(error);
    });
};

module.exports.sendEmailActivate = function (req, res, next) {
  activateEmail.activationForEmail(req.user);

  log({
    req: req,
    type: 'success',
    path: 'api',
    method: 'user@sendEmailActivate',
    user: req.user,
    desc: `User sent to email ${req.user.email} for yourself`,
  });

  return res.json({statusCode: 200, status: true, message: global.lang('Email sent.')});
};

module.exports.catchErrorLog = async function (req, res, next) {
  return await check({
    type: 'error',
    path: 'api',
    method: 'user@catchErrorLog',
    user: req.user,
  }, function (error, count) {
    if (error) {
      return next(error);
    }

    if (count > 0) {
      return res.status(400).json({statusCode: 400, status: false});
    }

    log({
      req: req,
      type: 'error',
      path: 'api',
      method: 'user@catchErrorLog',
      user: req.user,
      desc: `Error sent by client user.`,
      error: {
        error: req.body.error,
        errorInfo: req.body.errorInfo,
      }
    });

    return res.json({statusCode: 200, status: true});
  });
};
