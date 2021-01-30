const {User} = require('../../models');
const log = require('../../helpers/log');
const activateEmail = require('../../services/emails/auth/activation-for-email');
const confirmEmail = require('../../services/emails/super/user/confirmed');

module.exports.index = async function (req, res, next) {
  const conditions = {};

  if (req.body.role === 'admin') {
    conditions.role = 'admin';
  } else {
    conditions.role = 'user';
  }

  User.findAll({
    where: conditions,
    order: [
      ['id', 'desc']
    ]
  })
    .then((users) => {
      res.json({
        statusCode: 200,
        status: true,
        data: users,
      });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.create = async function (req, res, next) {
  const count = await User.count({
    where: {
      email: req.body.email,
    }
  });

  if (count > 0) {
    res.status(400).json({
      statusCode: 400,
      status: false,
      message: global.lang('Duplicate data detected!'),
    });
  }

  const create = await User.create({
    role: req.body.role === 'admin' ? 'admin' : 'user',
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
    premium: req.body.premium,
    premiumDate: req.body.premiumDate,
    premiumStatus: Boolean(req.body.premiumStatus),
    status: Boolean(req.body.status),
    token: (
      [...Array(36)].map(i => (~~(Math.random() * 36)).toString(36)).join('') +
      [...Array(36)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
    )
  });

  create.save()
    .then(() => {
      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'user@create',
        user: req.user,
        desc: `User created. Email: ${req.body.email}`,
      });

      res.json({statusCode: 200, status: true, message: global.lang('Successful created new user.')})
    })
    .catch(() => res.status(500).json({
      statusCode: 500,
      status: false,
      message: global.lang("Username already exists!")
    }));
};

module.exports.show = async function (req, res, next) {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user) {
        res.json({statusCode: 200, status: true, data: user})
      } else {
        res.status(404).json({statusCode: 404, status: true, message: global.lang('Not Found!')});
      }
    })
    .catch((error) => next(error));
};

module.exports.edit = async function (req, res, next) {
  User.findByPk(req.params.id)
    .then(async (user) => {
      if (req.body.password.length > 0) {
        user.password = req.body.password;
      }

      if (user.token === null) {
        user.token = (
          [...Array(36)].map(i => (~~(Math.random() * 36)).toString(36)).join('') +
          [...Array(36)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
        );
      }

      user.phone = req.body.phone;
      user.role = req.body.role === 'admin' ? 'admin' : 'user';
      user.premium = req.body.premium;
      user.premiumDate = req.body.premiumDate;
      user.premiumStatus = Boolean(req.body.premiumStatus);
      user.status = Boolean(req.body.status);
      user.email = req.body.email;
      user.name = req.body.name;
      await user.save();

      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'user@edit',
        user: req.user,
        desc: `User edited. Email: ${user.email}`,
      });

      return res.json({statusCode: 200, status: true, message: global.lang('Successful updated user.')});
    })
    .catch((error) => next(error));
};

module.exports.delete = async function (req, res, next) {
  User.destroy({where: {id: req.params.id}})
    .then(() => {
      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'user@delete',
        user: req.user,
        desc: `User deleted. Email: ${req.query.email}`,
      });

      return res.json({statusCode: 200, status: true, message: global.lang('Successful deleted user.')});
    })
    .catch(() => res.status(404).json({statusCode: 404, status: false, message: global.lang("Not Found!")}));
};

module.exports.sendConfirmEmail = async function (req, res, next) {
  User.findByPk(req.params.id)
    .then((user) => {
      confirmEmail.confirm(user);

      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'user@sendWelcomeToEmail',
        user: req.user,
        desc: `User sent an email to ${user.email}`,
      });

      return res.json({statusCode: 200, status: true, message: global.lang('Email sent.')});
    })
    .catch((error) => next(error));
};

module.exports.sendEmailActivation = async function (req, res, next) {
  User.findByPk(req.params.id)
    .then((user) => {
      activateEmail.activationForEmail(user);

      log({
        req: req,
        type: 'success',
        path: 'admin',
        method: 'user@sendEmailActivation',
        user: req.user,
        desc: `User sent an email to ${user.email}`,
      });

      return res.json({statusCode: 200, status: true, message: global.lang('Email sent.')});
    })
    .catch((error) => next(error));
};
