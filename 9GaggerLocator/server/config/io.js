var socketio = require('socket.io');
var io;
exports.init = function(server) {
    io = socketio.listen(server);
    console.log('Hello socket io');
    io.on('connection', function(socket) {
        console.log('Client connected');
    });
};