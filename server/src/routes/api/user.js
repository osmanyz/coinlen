const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/user');
const userPolicy = require('../../policies/api/user');

router.post('/update-account',
  userPolicy.updateAccount,
  userController.updateAccount
);
router.post('/update-password',
  userPolicy.updatePassword,
  userController.updatePassword
);
router.post('/send-email-activate', userController.sendEmailActivate);
router.post('/catch-errors-log-and-report-it',
  userPolicy.catchErrorLog,
  userController.catchErrorLog
);

module.exports = router;
