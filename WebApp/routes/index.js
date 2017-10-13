var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendInfo', function(req, res, next) {
	var fileName = path.resolve(__dirname, 'tmp/'+String(+ new Date())+'.json');
	var requestBody = req.body;
	var contents = JSON.stringify(requestBody);


	fs.writeFile(fileName, contents, function(err) {
	    if(err) {
	    	console.log(err);
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
})

router.get('/getInfo', function(req, res, next) {
	console.log(req);
	var directoryName = path.resolve(__dirname, 'tmp');

	fs.readdir(directoryName, (err, files) => {
		var customer;

		/*files.forEach(file => {
			// Was the file created after I loaded the pag?
			if(req.pageLoadTime < Number(file.split('.')[0]))
				/*fs.readFile(fileName, 'utf8', function (err, data) {
					if (err) {
						console.log(err);

						res.json({"error": "Customer not found"});
					} else {
			  			res.json(JSON.parse(data));
					}
				});

		});*/
	})


})

module.exports = router;
