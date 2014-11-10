nodejs-ws-ajax-rest
===================

Project workflow :
1- Client registers with username (kept in session.cookies)
2- Client connects to server
3- Client choose how he would proceed whether to use websockets or ajax requests to connect to the server
4- Server registers the client and store it to be able to reopen a connection if the client disconnects (page refresh, browser close and reopens).
5- Client send a simple hello message with his name
6- Server responds with the username of the client and the message was sent to it
7- Client disconnect and reconnect and the server uses the client username in the pages, recognising the client from the previous connection id.
8- Redirection is being managed with sessions.
9- Simple API backbone have been implemented

Notes:

No socket-io, no bootstrap just jQuery and ws with express, ejs used as templates, each necessary header is injected in each respective page, to perform less traffic.

ejs templates used in the code, they were designed to be reusable, inheriting only necessary heads, footers and body just to reduce traffic.

You can send api/register, api/messaging requests using the method POST in the form, the URL in the browser, CURL ..etc.

Qunit was used to test the websocket object initialization and Helper functions in the code, not only Qunit was used but also Grunt in order to create a nice user interface for the tests. UI of Qunit test used as well as with a watching task of grunt so that any changes in the tests.js will be automatically tested (the test resuls are in the html file which is watched by grunt, called QUnitTestResult.html)

Data validation is added into the HTMl5 forms, and also in the client side and in the server side.

To run the app execute "npm install", then "node app", to run the tests after "npm install" you can just use "npm test" or "grunt".
