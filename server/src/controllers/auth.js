const {User} = require('../models/index');
const jwt = require('jsonwebtoken');
const log = require('../helpers/log');
const siteVerify = require('../helpers/recaptcha-siteverify');
const authEmail = require('../services/emails/auth/welcome');
const newUserEmail = require('../services/emails/auth/new-user');
const activateEmail = require('../services/emails/auth/activated-email');

module.exports.check = async function (req, res) {
  jwt.verify(req.body.token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error || typeof decoded !== "object" || decoded === null || decoded.length === 0) {
      log({
        req: req,
        type: 'error',
        path: 'auth',
        method: 'auth@check',
        user: {},
        desc: `Authentication token isn't correct! User not found. ${req.body.email}`
      });

      return res.status(401).json({
        statusCode: 401,
        status: false,
        version: (process.env.WEB_VERSION).toString(),
        error: global.lang('Authentication failed. User not found.')
      });
    }

    const user = await User.findOne({
      where: {
        id: decoded.user,
        email: decoded.email
      },
    });

    if (user) {
      return res.json({
        statusCode: 200,
        status: true,
        version: (process.env.WEB_VERSION).toString(),
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          emailActivation: user.emailActivation,
          emailActivationDate: user.emailActivationDate,
          premiumStatus: user.premiumStatus,
          premium: user.premium,
          premiumDate: user.premiumDate,
        }
      });
    }

    log({
      req: req,
      type: 'error',
      path: 'auth',
      method: 'auth@check',
      user: user,
      desc: 'Authentication failed. User not found.'
    });

    return res.status(401).json({
      statusCode: 401,
      version: (process.env.WEB_VERSION).toString(),
      status: false,
      error: global.lang('Authentication failed. User not found.')
    });
  });
};

module.exports.preRegister = async function (req, res, next) {
  const validation = await siteVerify(req);

  if (typeof validation.data === 'undefined' || typeof validation.data.success === 'undefined') {
    return res.status(401).json({
      statusCode: 401,
      status: false,
      message: global.lang("Captcha verification is wrong!")
    });
  }

  if (validation.data.success === false) {
    return res.status(401).json({
      statusCode: 401,
      status: false,
      message: global.lang("Captcha verification is wrong! After repeating the same request please refresh the page.")
    });
  }

  const user = await User.findOne({
    where: {
      email: req.body.email
    },
  });

  if (user) {
    log({
      req: req,
      type: 'error',
      path: 'auth',
      method: 'auth@preRegister',
      user: user,
      desc: 'The user is trying to create an account with the current user email information!'
    });

    return res.status(401).json({
      statusCode: 401,
      status: false,
      message: global.lang("The process is not available!")
    });
  }

  const register = await User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    phone: req.body.phone,
    status: false,
    premiumStatus: false,
    premium: 'trial',
    premiumDate: new Date().setHours(180),
    token: (
      [...Array(36)].map(i=>(~~(Math.random()*36)).toString(36)).join('') +
      [...Array(36)].map(i=>(~~(Math.random()*36)).toString(36)).join('')
    ),
  });

  if (register) {
    log({
      req: req,
      type: 'success',
      path: 'auth',
      method: 'auth@preRegister',
      user: register,
      desc: 'Successful created new user.'
    });

    authEmail.welcome(register);
    newUserEmail.newUser(register);

    return res.json({statusCode: 200, status: true, message: global.lang('Successful created new user.')});
  }

  return res.status(401).json({
    statusCode: 401,
    status: false,
    message: global.lang("The process is not available!")
  });
};

module.exports.emailActivation = async function (req, res) {
  const user = await User.findOne({
    where: {
      token: req.body.code,
      emailActivation: false,
      emailActivationDate: null,
    },
  });

  if (user instanceof User) {
    activateEmail.emailActivate(user);

    log({
      req: req,
      type: 'success',
      path: 'auth',
      method: 'auth@emailActivation',
      user: user,
      desc: 'User confirmed account by email.'
    });

    user.emailActivation = true;
    user.emailActivationDate = new Date();
    user.save();

    return res.json({statusCode: 200, status: true, message: global.lang('The activation process is successful.')});
  }

  return res.status(401).json({
    statusCode: 401,
    status: false,
    message: global.lang("Your transaction could not be processed! Activation may have been completed earlier.")
  });
};

module.exports.superLogin = async function (req, res, next) {
  const query = {
    email: req.body.email,
    role: 'admin',
  };

  return user(query, 'superLogin', req, res, next);
};

module.exports.login = async function (req, res, next) {
  const query = {
    email: req.body.email,
  };

  if (req.body.time) {
    query.role = 'admin';
  }

  return user(query, 'login', req, res, next);
};

async function user(query, method, req, res, next) {
  const user = await User.findOne({
    where: {
      ...query
    }
  });

  if (!user) {
    log({
      req: req,
      type: 'error',
      path: 'auth',
      method: 'auth@' + method,
      user: {
        id: null,
        email: req.body.email,
      },
      desc: `Authentication failed. User not found.`
    });

    return res.status(401).send({
      statusCode: 401,
      status: false,
      message: global.lang('Authentication failed. User not found.')
    });
  }

  const isPasswordValid = await user.comparePassword(req.body.password);

  if (!isPasswordValid) {
    log({
      req: req,
      type: 'error',
      path: 'auth',
      method: 'auth@' + method,
      user: user,
      desc: 'Authentication failed. Wrong password.'
    });

    return res.status(401).send({
      statusCode: 401,
      status: false,
      message: global.lang('Authentication failed. User not found.')
    });
  }

  if (!user.status) {
    log({
      req: req,
      type: 'error',
      path: 'auth',
      method: 'auth@' + method,
      user: user,
      desc: 'Authentication failed. Pending to accept the user.'
    });

    return res.status(401).send({
      statusCode: 401,
      status: false,
      message: global.lang('Authentication failed. Pending process.')
    });
  }

  const token = jwt.sign({
    user: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    emailActivation: user.emailActivation,
    emailActivationDate: user.emailActivationDate,
    premium: user.premium,
    premiumDate: user.premiumDate,
    premiumStatus: user.premiumStatus,
  }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
  });

  log({
    req: req,
    type: 'success',
    path: 'auth',
    method: 'auth@' + method,
    user: user,
    desc: 'Login successful!'
  });

  return res.json({
    statusCode: 200,
    status: true,
    user: {
      status: user.status,
      name: user.name,
      email: user.email,
      phone: user.phone,
      premium: user.premium,
      premiumDate: user.premiumDate,
      premiumStatus: user.premiumStatus,
    },
    token: token
  });
}
