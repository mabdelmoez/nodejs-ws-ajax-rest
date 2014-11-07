QUnit.module("Helper class");
test( "Username Validity", function() {
	ok(Helper, "Helper Object Exists");
	equal(Helper.isValidUsername("ss"), true, "Right Condition Passed");
	equal(Helper.isValidUsername("ss "), false, "Has space at the end");
	equal(Helper.isValidUsername("@"), false, "special character");
	equal(Helper.isValidUsername(""), false, "empty");
	equal(Helper.isValidUsername("s s"), false, "Has space in the middle");
});

QUnit.module("WebSocket Connection Test");
test( "WebSocket Initialization", function() {
	ok(websocket, "Webscoket Object Exists and was Initialized");
});

//...