const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook');

router.route(process.env.WEBHOOK_URL).post(webhookController.event);

module.exports = router;
