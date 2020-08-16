//*************** Require Internal Modules ****************//

const router = require('./lib/router.js');
const config = require('./config/config.json');
const http = require('http');

global.api_token = null;
global.newsApi = null;

//*************** Application initialization **************//
const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header(config.server.defaultResponseHeaders);
    next();
});
const LISTEN_PORT = config.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(config.server.contextPath, express.static(__dirname + '/public/build'));

//*************** Application starting point ****************//
if (!module.parent) {

    var httpServer = http.createServer(app);
    httpServer.listen(LISTEN_PORT, () => {
        console.log("Server started at port: " + LISTEN_PORT);
    });
}

module.exports = app;