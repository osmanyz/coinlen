const express = require('express');
const router = express.Router();
const logController = require('../../controllers/super/log');

router.route('/').post(logController.index);
router.route('/show/:id').post(logController.show);
router.route('/delete/:id').delete(logController.delete);

module.exports = router;
