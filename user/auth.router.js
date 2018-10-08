var express        = require('express');
var router         = express.Router();
var authController = require('./auth.controller');

router.get('/', authController.status);

router.post('/', authController.login);

router.delete('/', authController.logout);

module.exports = router;
