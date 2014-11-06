var runner = require("../node_modules/qunit");
runner.run({
    code : "../nodejs-ws-ajax-rest/public/scripts/helper.js",
    tests : "../nodejs-ws-ajax-rest/tests/test.js"
});