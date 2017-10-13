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

	    res.json({"success": 1})
	}); 
})

router.get('/getInfo', function(req, res, next) {
	var startDate = Number(req.query.startDate);
	var directoryName = path.resolve(__dirname, 'tmp');

	fs.readdir(directoryName, (err, files) => {
		var fileName;

		files.forEach(file => {
			console.log(file, startDate);
			// Was the file created after the requested timestamp?
			if(startDate < Number(file.split('.')[0]))
				fileName = file;
		});

		if(fileName)
			fs.readFile(path.resolve(__dirname, 'tmp/'+fileName), 'utf8', function (err, data) {
				if (err) {
					console.log(err);

					res.json({"error": "Customer not found"});
				} else {
		  			res.json(JSON.parse(data));
				}

				respSent = true;
			});
		else 
			res.json({"error": "Customer not found"});
	});


})

module.exports = router;
