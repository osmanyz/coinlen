const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/super/dashboard');

router.route('/').post(dashboardController.index);

module.exports = router;
