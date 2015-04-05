var passport = require('passport');

exports.authenticate = function (request, result, next) {
    var auth = passport.authenticate('local', function (error, user) {
        if (error) {
            return next(error);
        }
        if (!user) {
            result.send({
                success: false
            });
        }
        request.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            result.send({
                success: true,
                user: user
            });
        });
    });
    auth(request, result, next);
};

exports.requireApiLogin = function (request, response, next) {
    if (!request.isAuthenticated()) {
        response.status(403);
        response.end();
    } else {
        next();
    }
}

exports.requiresRole = function (role) {
    return function (request, response, next) {
        if (!request.isAuthenticated() || request.user.roles.indexOf(role) === -1) {
            response.status(403);
            response.end();
        } else {
            next();
        }
    };
}