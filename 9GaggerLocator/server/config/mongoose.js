var mongoose = require('mongoose');
var userModel = require('../models/user');
//var crypto = require('../utilities/encryption');


module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Db connection opened');
    });

    userModel.createDefaultUsers();
};
