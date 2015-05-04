var io = require('socket.io');
var http = require('http');

exports.init = function (app) {
    var server = http.createServer(app);
    server.listen(3000);
    //console.log(server);
    var tmp = io(server);
    console.log('Hello socket io');
    tmp.on('connection', function(socket) {
        console.log('Client connected');
    });
    //console.log(tmp);
};