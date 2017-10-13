var express = require('express');
var router = express.Router();
var fs = require('fs');

/* Receive prospect info */
router.get('/', function(req, res, next) {
	fs.writeFile("userInfo.jon", JSON.stringify(req));
});

module.exports = router;