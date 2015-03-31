var passport = require('passport');

var bodyParser = require('body-parser');

module.exports = function (app) {
    app.get('*', function (request, response) {
        response.render('index.html');
    });

    app.post('/login', function (request, result, next) {

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
    });

    app.post('/logout', function (request, result) {
        request.logout();
        result.end();
    });
};