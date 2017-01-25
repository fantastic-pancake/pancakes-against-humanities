import gulp from "gulp";
import path from "path";
import rimraf from "rimraf";
import child_process from "child_process";
import webpackConfig from "./webpack.config.js";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

const $ = require("gulp-load-plugins")();

// -----------------------------------
// Server
gulp.task("server:clean", cb => {
	rimraf("./build", () => cb());
});

gulp.task("server:build",
	gulp.series(
		"server:clean",
		compileServer
	));

gulp.task(
	"server:watch",
	gulp.series(
		"server:build",
		watchServer
	));

gulp.task(
	"server:dev",
	gulp.series(
		"server:build",
		gulp.parallel(
			watchServer,
			runServer
		)
	));

gulp.task(
	"server:test:dev",
	gulp.series(
		"server:build",
		gulp.parallel(
			watchServer,
			runServerTests
		)));

gulp.task(
	"server:test",
	gulp.series(
		"server:build",
		testServer
	));

gulp.task(
	"server:test:dev",
	gulp.series(
		"server:build",
		gulp.parallel(
			watchServer,
			runServerTests
		)));

function compileServer() {
	return gulp.src("./src/server/**/*.js")
		.pipe($.changed("./build"))
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.sourcemaps.write(".", {sourceRoot: path.join(__dirname, "src", "server")}))
		.pipe(gulp.dest("./build"));
}

function watchServer() {
	return gulp
		.watch("./src/server/**/*.js", gulp.series(compileServer))
		.on("error", () => {});
}

function runServer() {
	return $.nodemon({
		script: "./server.js",
		watch: "build",
		ignore: ["**/__tests"],
		exec: "node --debug"
	});
}

function testServer(cb) {
	child_process.exec("node ./tests/server.js", (err, stdout, stderr) => {
		console.log(stdout);
		console.error(stderr);

		if (err) {
			cb(new $.util.PluginError("testServer", "Tests failed"));
		} else {
			cb();
		}
	});
}

function runServerTests() {
	return $.nodemon({
		script: "./tests/server.js",
		watch: "build"
	});
}

// -----------------------------------
// Client
const consoleStats = {
	colors: true,
	exclude: ["node_modules"],
	chunks: false,
	assets: false,
	timings: true,
	modules: false,
	hash: false,
	version: false
};

gulp.task("client:clean", cb => {
	rimraf("./public/build", () => cb());
});

gulp.task(
	"client:build",
	gulp.series(
		"client:clean",
		buildClient
	));

gulp.task(
	"client:dev",
	gulp.series(
		"client:clean",
		watchClient
	));

gulp.task(
	"client:test",
	gulp.series(
		"client:build",
		compileClientTests,
		testClient
	));

// gulp.task(
// 	"client:test:dev",
// 	gulp.series(
// 		"client:build",
// 		gulp.parallel(
// 			watchClient,
// 			runClientTests
// 		)));

function buildClient(cb) {
	webpack(webpackConfig, (err, stats) => {
		if (err) {
			cb(err);
			return;
		}

		console.log(stats.toString(consoleStats));
		// compileClientTests()
		cb();
	});
}

function compileClientTests() {
	return gulp.src("./src/client/**/testClient.js")
		.pipe($.changed("./build"))
		.pipe($.sourcemaps.init())
		.pipe($.babel())
		.pipe($.sourcemaps.write(".", {sourceRoot: path.join(__dirname, "src", "client")}))
		.pipe(gulp.dest("./build"));
}


function watchClient() {
	const compiler = webpack(webpackConfig);
	const server = new WebpackDevServer(compiler, {
		publicPath: "/build/",
		hot: true,
		stats: consoleStats
	});

	server.listen(8080, () => {});
}

function testClient(cb) {
	child_process.exec("node ./tests/client.js", (err, stdout, stderr) => {
		console.log(stdout);
		console.error(stderr);

		if (err) {
			cb(new $.util.PluginError("testClient", "Tests failed"));
		} else {
			cb();
		}
	});
}

// function runClientTests() {
// 	return $.nodemon({
// 		script: "./tests/client.js",
// 		watch: "public/build"
// 	});
// }


// -----------------------------------
// Other Tasks
gulp.task("dev", gulp.parallel("server:dev", "client:dev"));
gulp.task("build", gulp.parallel("server:build", "client:build"));
gulp.task("test", gulp.parallel("server:test:dev", "client:test"))
