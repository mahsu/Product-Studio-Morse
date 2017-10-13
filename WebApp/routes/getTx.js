var express = require('express');
var router = express.Router();
const crypto2 = require('crypto2');

/* GET home page. */
router.get('/', function(req, res, next) {
  var privateKey = 'privKey123';
  var publicKey = 'pubKey123';

  var txId = Math.floor((Math.random()*100000000000));

  // This function creates a 2048-bit strong RSA key pair in PEM format.
  crypto2.createKeyPair((err, txPrivKey, txPubKey) => {
	var tuple = txId+','+txPubKey;

	// AES 256 CBC encryption algorithm
	crypto2.encrypt(tuple, privateKey, (err, encrypted) => {
		res.send(encrypted);
	});
  });
});

module.exports = router;