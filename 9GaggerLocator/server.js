var express = require('express');
var http = require('http');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

var port = config.port;
var server = http.Server(app);
server.listen(port);

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

require('./server/config/io.js').init(server);

console.log('Listening on port ' + port + '...');