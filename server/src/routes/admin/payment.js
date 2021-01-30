const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/super/payment');

router.route('/').post(paymentController.index);
router.route('/show/:id').post(paymentController.show);

module.exports = router;
