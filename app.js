var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var path = require ('path'); //for windows enviroment 
var port = 5000;

var app = express();
var router = express.Router(); 

 	
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/public/views');
	app.use(express.static(path.join(__dirname + '/public'))); //to work with link rel
	//app.use(express.static(__dirname + '/public'));
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	
    app.get('/', function(req, res, next) {
		 res.render('pages/index');
    });
	
   app.get('/appajax', function(req, res) {
    	res.render('pages/appajax', {
    		username: 'user'
    	})
    });

    app.get('/appws', function(req, res) {
    	res.render('pages/appws', {
    		username: 'user'
    	})
    });

    /*app.use('/', router);*/
		
	app.get('/api/messaging', function(req, res, next) {
		 console.log('received api get request');
		 console.log(req.body);
		 res.json(req.body);
    });
    
	app.post('/api/messaging', function(req, res, next) {
       console.log('receiving api post request');
	   res.send(req.body);
    });
	
	
	app.use('/api/messaging', router);
    

	app.server = http.createServer(app);
    app.server.listen(port);

    console.log("app server listening on %d", port);

var userId;
var wss = new WebSocketServer({server: app.server});
    wss.on("connection", function (ws) {

    console.info("websocket connection open");

    var timestamp = new Date().getTime();
    userId = timestamp;



    ws.on("message", function (data, flags) {
        console.log("websocket received a message");
        var clientMsg = data;
        console.log(clientMsg);
        ws.send(JSON.stringify({msg:{connectionId:userId, Data:clientMsg}}));
    });

    ws.on("close", function () {
        console.log("websocket connection close");
    });
});