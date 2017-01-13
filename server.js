const path = require("path");
require("source-map-support").install();
global.appRoot = path.resolve(__dirname); // creating a global app root variable which will be an absolute path to the entire root of the project
require("./build/server");