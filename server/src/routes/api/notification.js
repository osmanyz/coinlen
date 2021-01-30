const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/api/notification');
const notificationPolicy = require('../../policies/api/notification');

router.post('/',
  notificationPolicy.index,
  notificationController.index
);
router.post('/latest', notificationController.latest);
router.post('/show/:id', notificationController.show);

module.exports = router;
