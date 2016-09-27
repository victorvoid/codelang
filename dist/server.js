"use strict";

var _fs = require("fs");

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readPhrases = function readPhrases(q) {
	var categories = ["common-expressions-pt-eng.txt", "greetings-pt-eng.txt", "making-friends-pt-eng.txt", "work-pt-eng.txt", "general-questions-pt-eng.txt", "shopping-pt-eng.txt"];

	if (q > categories.length) {
		q = 0;
	} //id can't to be > categorie length 
	console.log('-> ', q);
	return (0, _fs.readFileSync)(__dirname + "/phrases/" + categories[q], 'utf8').split('\n').filter(function (n) {
		return n != '';
	}).map(function (line) {
		return line.trim();
	});
};

_http2.default.createServer(function (request, response) {
	response.setHeader("Access-Control-Allow-Origin", "*");
	//;; option of the phrase and write
	function successRes(opCategory) {
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.write(JSON.stringify({ phrases: readPhrases(opCategory) }));
	}
	function errorRes() {
		response.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
		response.write(JSON.stringify({ message: "Not found" }));
	}

	var routes = ['/api/pt/readphrases/', '/api/eng/readphrases/'];
	var url_parts = _url2.default.parse(request.url, true);
	var query = url_parts.query;
	var id = typeof query.id === 'undefined' ? 0 : parseInt(query.id);
	switch (url_parts.pathname) {
		case routes[0]:
			successRes(id);
			break;
		case routes[1]:
			successRes(id);
			break;
		default:
			errorRes();
	}
	response.end();
}).listen(8888);