const express = require('express');
const router = express.Router();
const coinFormatController = require('../../controllers/super/coin.format');
const coinFormatPolicy = require('../../policies/admin/coin.format');

router.route('/').post(coinFormatController.index);
router.route('/create').post(
  coinFormatPolicy.create,
  coinFormatController.create
);
router.route('/show/:id').post(coinFormatController.show);
router.route('/edit/:id').post(
  coinFormatPolicy.edit,
  coinFormatController.edit
);
router.route('/delete/:id').delete(coinFormatController.delete);

module.exports = router;
