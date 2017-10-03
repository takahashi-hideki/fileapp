var express = require('express');
var router = express.Router();

var api = require('./file/api.js');

router.use('/api', api);

module.exports = router;