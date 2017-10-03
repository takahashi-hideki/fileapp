var express = require('express');
var router = express.Router();

var api = require('./database/api.js');

router.use('/api', api);

module.exports = router;