var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var port = 5000;

var app = express();


 
    app.use(express.static(__dirname));
	/*app.set('view engine', 'ejs');
    app.get('/', function(req, res, next) {
		 res.render('index');
		 console.log('receiving index routing');
    });*/
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var router = express.Router(); 
 
	
	
	app.get('/messaging', function(req, res, next) {
		 console.log('receiving get request');
		 console.log(req.body);
		 res.json(req.body);
    });
    
	app.post('/messaging', function(req, res, next) {
       console.log('receiving post request');
	   res.send(req.body);
    });
	
	
	app.use('/messaging', router);
    

	app.server = http.createServer(app);
    app.server.listen(port);

console.log("http server listening on %d", port);

var userId;
var wss = new WebSocketServer({server: app.server});
    wss.on("connection", function (ws) {

    console.info("websocket connection open");

    var timestamp = new Date().getTime();
    userId = timestamp;



    ws.on("message", function (data, flags) {
        console.log("websocket received a message");
        var clientMsg = data;

        ws.send(JSON.stringify({msg:{connectionId:userId, Data:clientMsg}}));


    });

    ws.on("close", function () {
        console.log("websocket connection close");
    });
});
console.log("websocket server created");