const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/super/notification');

router.post('/', notificationController.index);
router.post('/show/:id', notificationController.show);
router.post('/delete/:id', notificationController.delete);
router.post('/delete', notificationController.deleteAll);

module.exports = router;
