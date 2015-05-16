/// <reference path="../../typings/node/node.d.ts" />
var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, '../log');
file = path.join(file, 'server.log');
exports.info = function (message) {
    checkLogFile();
    fs.appendFile(file, "" + new Date().toISOString() + " - [Info] - " + message, errorCallback);
    //console.info(message);
};
exports.success = function (message) {
    checkLogFile();
    fs.appendFile(file, "" + new Date().toISOString() + " - [Success] - " + message, errorCallback);
};
exports.error = function (message) {
    checkLogFile();
    fs.appendFile(file, "" + new Date().toISOString() + " - [Error] - " + message, errorCallback);
    //console.error(message);
};
var checkLogFile = function () {
    fs.exists(file, function (exists) {
        if (!exists) {
            fs.writeFile(file, '', errorCallback);
        }
    });
};
var errorCallback = function (error) {
    console.error(error);
};
//# sourceMappingURL=logger.js.map