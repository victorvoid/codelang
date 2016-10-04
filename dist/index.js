"use strict";

var _fs = require("fs");

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var categories = ["common-expressions-pt-eng.txt", "greetings-pt-eng.txt", "making-friends-pt-eng.txt", "work-pt-eng.txt", "general-questions-pt-eng.txt", "shopping-pt-eng.txt"];

var readPhrases = function readPhrases(q) {
	if (q > categories.length) {
		q = 0;
	} //id can't to be > categorie length 
	return (0, _fs.readFileSync)(__dirname + "/phrases/" + categories[q], 'utf8').split('\n').filter(function (n) {
		return n != '';
	}).map(function (line) {
		return line.trim();
	});
};

var start = function start() {
	var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var minutesInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

	var options = {}; //get args in gulp
	var server = _http2.default.createServer(function (request, response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		//;; option of the phrase and write
		function successRes(opCategory) {
			response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
			options = {
				phrases: readPhrases(opCategory),
				category: category,
				minutesInterval: minutesInterval
			};
			response.write(JSON.stringify(options));
		}

		function errorRes() {
			response.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
			response.write(JSON.stringify({ message: "Not found" }));
		}

		var routes = ['/api/pt/readphrases/', '/api/eng/readphrases/', '/api/categories'];
		var url_parts = _url2.default.parse(request.url, true);
		var query = url_parts.query;
		//category variables ;; gulp args
		var id = typeof query.id === 'undefined' ? category : parseInt(query.id);
		switch (url_parts.pathname) {
			case routes[0]:
				successRes(id);
				break;
			case routes[1]:
				successRes(id);
				break;
			case routes[2]:
				response.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
				response.write(JSON.stringify({ categories: categories }));
				break;
			default:
				errorRes();
		}
		response.end();
	});

	server.listen(8888, function () {});
};

exports.start = start;