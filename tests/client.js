require("source-map-support").install();
const Jasmine = require("jasmine");

const testsClient = new Jasmine();
testsClient.loadConfig({
	spec_dir: "./build",
	spec_files: ["**/__tests/testClient.js"]
});

testsClient.execute();
