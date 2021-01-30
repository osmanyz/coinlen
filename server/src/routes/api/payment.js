const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/api/payment');

router.post('/', paymentController.list);
router.post('/do', paymentController.doPayment);

module.exports = router;
