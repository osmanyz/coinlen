const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authPolicy = require('../policies/auth');

router.post('/pre-register',
  authPolicy.preRegister,
  authController.preRegister
);
router.post('/check',
  authPolicy.check,
  authController.check
);
router.post('/login',
  authPolicy.login,
  authController.login
);
router.post('/email-activation',
  authPolicy.emailActivation,
  authController.emailActivation
);
router.post('/admin-login',
  authPolicy.superLogin,
  authController.superLogin
);

module.exports = router;



