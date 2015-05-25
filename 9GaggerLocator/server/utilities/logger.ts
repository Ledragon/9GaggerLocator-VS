/// <reference path="../../typings/node/node.d.ts" />
var path = require('path');
var fs = require('fs');
var file = path.resolve(__dirname, '../log');
file = path.join(file, 'server.log');

exports.info = (message: any) => {
    checkLogFile();
    fs.appendFile(file, `\n${new Date().toISOString()} - [Info] - ${message}`, errorCallback);
    //console.info(message);
};
exports.success = (message: any) => {
    checkLogFile();
    fs.appendFile(file, `\n${new Date().toISOString()} - [Success] - ${message}`, errorCallback);
};

exports.error = (message: any) => {
    checkLogFile();
    fs.appendFile(file, `\n${new Date().toISOString()} - [Error] - ${message}`, errorCallback);
    //console.error(message);
};

var checkLogFile = () => {
    fs.exists(file, (exists: any) => {
        if (!exists) {
            fs.writeFile(file, '', errorCallback);
        }
    });
};
var errorCallback = (error: any) => {
    console.error(error);
};