const express = require('express');
const router = express.Router();
const coinController = require('../../controllers/api/coin');

router.post('/format', coinController.coinsFormat);
router.post('/history/:id', coinController.coinHistory);
router.post('/main', coinController.main);

module.exports = router;
