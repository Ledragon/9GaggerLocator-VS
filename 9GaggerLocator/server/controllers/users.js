var mongoose = require('mongoose');
var User = mongoose.model('User');
var crypto = require('../utilities/encryption');
var _ = require('lodash');
exports.getUsers = function(request, response) {
    User.find({}).exec(function(error, collection) {
        response.send(collection);
    });
};
exports.getUserNames = function(request, response) {
    User.find({}).exec(function(error, collection) {
        if (error) {
        } else {
            var result = [];
            collection.forEach(function(user) {
                result.push({
                    userName: user.username,
                    country: user.country ? user.country : 'United States',
                    state: user.state,
                    city: user.city,
                    gender: user.gender,
                    latitude: user.latitude,
                    longitude: user.longitude
                });
            });
            result = _.sortBy(result, function(r) { return r.country;});
            response.send(result);
        }
    });
};
exports.createUser = function(request, response, next) {
    var userData = request.body;
    userData.salt = crypto.createSalt();
    userData.hashed_pwd = crypto.hashPassword(userData.salt, userData.password);
    User.create(userData, function(error, user) {
        if (error) {
            response.status(400);
            return response.send({ reason: error.toString() });
        }
        request.logIn(user, function(error) {
            if (error) {
                return next(error);
            }
            response.send(user);
        });
    });
};