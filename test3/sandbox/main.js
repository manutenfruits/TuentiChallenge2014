var http = require('http'),
	_ = require('underscore'),
	Q = require('q'),
	fs = require('fs'),
	qs = require('querystring'),
	cheerio = require('cheerio');

var max = 31,
	results = new Array(max),
	promises = [];

for (var i = 0; i < max; i++) {
	results[i] = new Array(max);
}

var options = {
	host: 'gamblers.contest.tuenti.net',
	port: 80,
	path: '/',
	method: 'POST'
};

var getSolution = function (a, b) {
	var dfd = Q.defer();
	var data = qs.stringify({
	      x: a,
	      y: b
  	});
	var params = _.extend(options, {
		data: data,
		headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Content-Length': Buffer.byteLength(data)
	    }
	});

	var req = http.request(params, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (body) {
			var $ = cheerio.load(body);
			results[a][b] = $('input[name="result"]').val();
			dfd.resolve();
		});
	});

	req.write(data);
	req.end();

	return dfd.promise;
};

_.each(results, function (row, a) {
	for (var b = 0; b < max; b++) {
		var prom = getSolution(a, b);
		promises.push(prom);
	}
});

Q.all(promises)
	.then(function () {
		//CSVing results
		var dfd = Q.defer(),
			csv = _.map(results, function (row) {
				return row.join(',');
			}).join('\n');

		fs.writeFile('results.csv', csv, function () {
			dfd.resolve();
		});

		return dfd.promise;
	})
	.done(function () {
		console.log('DONE!');
		process.exit();
	});