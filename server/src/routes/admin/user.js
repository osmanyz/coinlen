const express = require('express');
const router = express.Router();
const userController = require('../../controllers/super/user');
const userPolicy = require('../../policies/admin/user');

router.route('/').post(userController.index);
router.route('/create').post(
  userPolicy.create,
  userController.create
);
router.route('/show/:id').post(userController.show);
router.route('/edit/:id').post(
  userPolicy.edit,
  userController.edit
);
router.route('/delete/:id').delete(userController.delete);
router.route('/send-confirm-email/:id').post(userController.sendConfirmEmail);
router.route('/send-email-activate/:id').post(userController.sendEmailActivation);

module.exports = router;
