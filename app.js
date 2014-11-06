var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var path = require ('path'); //for windows enviroment 
var session = require('express-session');
var port = 5000;
var app = express();
var router = express.Router(); 
var store  = new session.MemoryStore;
var cookieSettings = {path: '/', httpOnly: false, maxAge: null};
var sessionHandler = session({ secret: 'secret', store: store, saveUninitialized: true, resave: true, cookie: cookieSettings, rolling: true, signed: true});


	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/public/views');
	app.use(express.static(path.join(__dirname + '/public'))); //to work with link rel
	//app.use(express.static(__dirname + '/public'));
	app.use(sessionHandler);
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	
    app.get('/', function(req, res, next) {
    	if(req.session.username){
    		res.redirect('/app')
	    }
    	else{
    	res.render('pages/register');
    	}
    });
	
    var username = "user";
    
    app.get('/app', function(req, res) {
	    if(req.session.username){
	    	username = req.session.username;  
	    	 res.render('pages/app', {
	     		username: username
	     	})
	    }
	    else{
	    	res.redirect('/');
	    }
    });
    
    
   app.get('/appajax', function(req, res) {
	    if(req.session.username){
	    	username = req.session.username;
	    	res.render('pages/appajax', {
	    		username: username
	    	})
	    }
	    else{
   		 res.redirect('/');
	    }
    });

    app.get('/appws', function(req, res) {
 	    if(req.session.username){
 	    	username = req.session.username;
 	    	res.render('pages/appws', {
 	    		username: username
 	    	})
 	    	
 	    }
	 	 else{
	  		 res.redirect('/');
	  	}

    });

   
		
	app.get('/api/messaging', function(req, res, next) {
		 console.log('received api messaging get request');
		 res.json(req.body);
    });
    
	app.post('/api/messaging', function(req, res, next) {
       console.log('receiving api post request');
	   res.send(JSON.stringify({serverMsg:{username:req.session.username, message:req.body.message}}));
    });
	
	app.post('/api/register', function(req, res, next) {
	       console.log('receiving register api post request');
	       req.session.username = req.body.username;
		   res.json({msg:"OK"});
	});
	
	
	/*app.use('/api', router);*/
	app.use('/', router);	 
	app.server = http.createServer(app);
    app.server.listen(port);
    console.log("app server listening on %d", port);


var wss = new WebSocketServer({server: app.server});

    wss.on("connection", function (ws) {
    
    console.info("websocket connection open");
    var connCookie = ws.upgradeReq.headers.cookie;
    if (connCookie) {
	        ws.sessionId = connCookie.split('=')[1].substring(4).split('.')[0];;	//without cookie parser..etc
	    	store.get(ws.sessionId, function (err, session) {
	          if (err) 
	          {
	        	  console.log(err);
	          } 
	          else
	          {
	              ws.session = session; 
	          }
	        });
      } else {
         return;
    }

    ws.on("message", function (data, flags) {
        console.log("websocket received a message");
        var clientMsg = data;
        var username = ws.session.username;
        ws.send(JSON.stringify({serverMsg:{username:username, message:JSON.parse(data).message}}));
    });

    ws.on("close", function () {
        console.log("websocket connection close");
    });
});