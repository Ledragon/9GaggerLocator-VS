var geoDataService = require('../services/geoDataService');

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

exports.getClosestCity = function(request, response) {

};