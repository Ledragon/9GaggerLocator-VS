var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, '../log');
file = path.join(file, 'server.log');

exports.info = function(message) {
    checkLogFile();
    fs.appendFile(file, '\n[Info] - ' + message, errorCallback);
    console.info(message);
};
exports.success = function(message) {
    checkLogFile();
    fs.appendFile(file, '\n[Success] - ' + message, errorCallback);
    console.log(message);
};

exports.error = function(message) {
    checkLogFile();
    fs.appendFile(file, '\n[Error] - ' + message, errorCallback);
    console.error(message);
};

checkLogFile = function() {
    fs.exists(file, function(exists) {
        if (!exists) {
            fs.writeFile(file, '', errorCallback);
        }
    });
};
errorCallback = function(error) {
    console.error(error);
};