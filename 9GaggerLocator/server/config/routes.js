var auth = require('./auth');
var usersController=require('../controllers/users');
var geoController = require('../controllers/geo');

module.exports = function (app) {
    app.get('/user', function (request, response) {
        response.send(request.user);
    });

    app.get('/api/userNames',
        usersController.getUserNames
    );

    app.get('/api/users',
        auth.requiresRole('admin'),
        usersController.getUsers
    );

    app.post('/api/users',
        usersController.createUser
    );

    app.get('/api/countries',
        geoController.getCountries
    );

    app.get('*', function (request, response) {
        response.render('index.html');
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (request, result) {
        request.logout();
        result.end();
    });
};