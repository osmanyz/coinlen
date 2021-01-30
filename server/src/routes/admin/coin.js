const express = require('express');
const router = express.Router();
const coinController = require('../../controllers/super/coin');
const coinPolicy = require('../../policies/admin/coin');

router.route('/').post(coinController.index);
router.route('/create').post(
  coinPolicy.create,
  coinController.create
);
router.route('/show/:id').post(coinController.show);
router.route('/edit/:id').post(
  coinPolicy.edit,
  coinController.edit
);
router.route('/delete/:id').delete(coinController.delete);

module.exports = router;
