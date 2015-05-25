var geoDataService = require('../services/geoDataService');
var logger = require('../utilities/logger');

exports.getCountries = function(request, response) {
    geoDataService.getCountries110m(function(error, data) {
        if (error) {
            response.status(404);
            response.send(error);
        } else {
            response.send(data);
        }
    });
};

exports.getStates = function (request, response) {
    logger.info('Controller: retrieving states');
    var country = request.query.name;
    if (country) {
        geoDataService.getStates10m(country, function(error, states) {
            if (error) {
                response.status(404);
                response.send(error);
            } else {
                response.send(states);
            }
        });
    }
};
exports.getClosestCity = function(request, response) {

};