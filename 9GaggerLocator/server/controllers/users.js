var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('../utilities/encryption');
exports.getUsers = function (request, response) {
    User.find({}).exec(function (error, collection) {
        response.send(collection);
    });
}

exports.createUser = function (request, response, next) {
    var userData = request.body;
    userData.salt=crypto.createSalt();
    userData.hashed_pwd = crypto.hashPassword(userData.salt, userData.password);
    User.create(userData, function (error, user) {
        if (error) {
            response.status(400);
            return response.send({ reason: error.toString() });
        }
        request.logIn(user, function (error) {
            if (error) {
                return next(error);
            }
            response.send(user);
        });
    })
}