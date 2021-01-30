const express = require('express');
const router = express.Router();
const CurrencyPolicy = require('../../policies/admin/currency');
const currencyController = require('../../controllers/super/currency');

router.post('/show', currencyController.show);
router.post('/update',
  CurrencyPolicy.update,
  currencyController.update
);

module.exports = router;
