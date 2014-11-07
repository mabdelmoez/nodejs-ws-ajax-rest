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

var HelperServer = (function() {
    return {
    	isValidUsername:function(fieldName) {
        	return (fieldName.length != 0 && fieldName.length <= 25 && (/^[A-Za-z0-9\d]+$/.test(fieldName))); // alphanum does not have any spaces, no special characters from 1-25 chrs
        },
        isValidMessage:function(fieldName) {
        	return (fieldName.length != 0 && fieldName.length <= 25 && !(/\s/.test(fieldName))); //anything but no spaces 1-25 chrs
        },
        isJSON:function(string){
        	try{
        		JSON.parse(string);
        		return true;
        	}
        	catch(e){
        		return false;
        	}
        }
    }   
}());



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
		 res.json(req.body); //just a test
    });
    
	app.post('/api/messaging', function(req, res, next) {
       console.log('receiving api post request');
       if(HelperServer.isJSON(JSON.stringify(req.body)) && HelperServer.isValidMessage(req.body.message)){
    	   res.send(JSON.stringify({serverMsg:{username:req.session.username, message:req.body.message}}));
           }
       else{
       	console.log("Wrong message format detected"); //To be modified later to send feedback to user from server
       }
    });
	
	app.post('/api/register', function(req, res, next) {
	       if(HelperServer.isJSON(JSON.stringify(req.body)) && HelperServer.isValidUsername(req.body.username)){
	    	   req.session.username = req.body.username;
			   res.json({msg:"Created"});
	           }
	       else{
	       	console.log("Wrong message format detected"); //To be modified later to send feedback to user from server
	       	   res.json({msg:"Not Created"});
	       }
	       
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
	              ws.session = session; //store the session in the ws object
	          }
	        });
      } else {
         return;
    }

    ws.on("message", function (data, flags) {
        console.log("websocket received a message");
        var username = ws.session.username;
        if(HelperServer.isJSON(data) && HelperServer.isValidMessage(JSON.parse(data).message)){
        ws.send(JSON.stringify({serverMsg:{username:username, message:JSON.parse(data).message}}));
        }
        else{
        	console.log("Wrong message format detected"); //To be modified later to send feedback to user from server
        }
    });

    ws.on("close", function () {
        console.log("websocket connection close");
    });
	});