import {readFileSync} from "fs";
import http from "http";
import url from 'url';


let categories = [
	"common-expressions-pt-eng.txt",
	"greetings-pt-eng.txt",
	"making-friends-pt-eng.txt",
	"work-pt-eng.txt",
	"general-questions-pt-eng.txt",
	"shopping-pt-eng.txt"
];

let readPhrases = q => {	
	if(q > categories.length){q = 0;} //id can't to be > categorie length 
	return readFileSync(__dirname+"/phrases/"+ categories[q], 'utf8')
	.split('\n')
	.filter(n => n != '')
	.map(line => line.trim());
}

let start = function(category = 0, minutesInterval = 10){
	let options = {}; //get args in gulp
	let server =
		http.createServer((request, response) => {
		response.setHeader("Access-Control-Allow-Origin", "*");
			//;; option of the phrase and write
			function successRes(opCategory){
				response.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
				options = {
					phrases:readPhrases(opCategory),
					category: category,
					minutesInterval: minutesInterval
				}
				response.write(JSON.stringify(options));
			}

			function errorRes(){
				response.writeHead(404, {'Content-Type':'application/json;charset=utf-8'});
				response.write(JSON.stringify({message: "Not found"}));
			}

			let routes = ['/api/pt/readphrases/', '/api/eng/readphrases/', '/api/categories'];
			var url_parts = url.parse(request.url, true);
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
					response.writeHead(200, {'Content-Type':'application/json;charset=utf-8'});
					response.write(JSON.stringify({categories: categories}));
					break;
				default:
					errorRes();
			}
			response.end();
		});

	server.listen(8888, function(){});
}

exports.start = start;