var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
//var bodyParser = require('body-parser');

module.exports = function (app) {
    app.get('/user', function (request, response) {
        response.send(request.user);
    });

    app.get('/api/users',
        auth.requiresRole('admin'),
        function (request, response) {
            User.find({}).exec(function (error, collection) {
                response.send(collection);
            });
    });

    app.get('*', function (request, response) {
        //console.log('username: ' + username);

        response.render('index.html');
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (request, result) {
        request.logout();
        result.end();
    });
};