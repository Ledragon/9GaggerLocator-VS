var socketio = require('socket.io');
var io;
exports.init = function(server) {
    io = socketio.listen(server);
    console.log('Hello socket io');
    io.on('connection', function(socket) {
        console.log('Client connected');
        socket.on('message', function(userName, message) {
            console.log(userName+ ' says ' +message);
            io.emit('message', userName, message);
        });

        socket.on('message-sent', function (userName, args) {
            console.log('User ' + userName + ' sent a message to ' + args[0].to);
            io.emit('message-sent', userName, args[0]);
        });
    });
};