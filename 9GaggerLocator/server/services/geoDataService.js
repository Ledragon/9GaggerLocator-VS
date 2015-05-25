var path = require('path');
var fs = require('fs');
var logger = require('../utilities/logger');
var _ = require('lodash');
var topojson = require('topojson');

var cities;
var countries;
exports.getCountries110m = function(callback) {
    getCountries110m(callback);
};

exports.getCountry = function(countryName, callback) {
    getCountryByName(countryName, callback);
};

exports.getStates10m = function(countryName, callback) {
    getCountryByName(countryName, function (error, country) {
        if (!error) {
            logger.info('Reading states.');
            var result = [];
            var url = path.join(__dirname, '../data/states-provinces-10m.topo.json');
            fs.readFile(url, function(err, data) {
                if (err) {
                    logger.error(err);
                } else {
                    logger.success('States successfully read.');
                    var parsed = JSON.parse(data);
                    var geoFormat = topojson.feature(parsed, parsed.objects['states-provinces']);
                    result = geoFormat.features.filter(function(g) {
                        return g.properties.adm0_a3 === country.properties.adm0_a3;
                    });
                }
                callback(err, result);
            });
        } else {
            callback(error);
        }
    });
};

exports.getClosestCity = function(longitude, latitude, callback) {
    logger.info('Finding closest city to (\'' + longitude + '\', \'' + latitude + '\').');
    if (!cities) {
        var url = path.join(__dirname, '../data/populated-places-10m.geo.json');
        fs.readFile(url, function(error, data) {
            var result = {};
            if (error) {
                logger.error(error);
                callback(error, result);
            } else {
                var object = JSON.parse(data);
                cities = object;
                findClosestCity(object, longitude, latitude, callback);
            }
        });
    } else {
        findClosestCity(cities, longitude, latitude, callback);
    }
};

var getCountries110m = function(callback) {
    logger.info('Reading countries.');
    var result = [];
    var url = path.join(__dirname, '../data/countries-110m.topo.json');
    fs.readFile(url, function(error, data) {
        if (error) {
            logger.error(error);
        } else {
            logger.success('Countries successfully read.');
            result = data;
        }
        callback(error, result);
    });
};

var getCountryByName = function(countryName, callback) {
    logger.info('Finding country with name \'' + countryName + '\'');
    getCountries110m(function(error, countries) {
        if (error) {
            logger.error(error);
        } else {
            try {
                var parsed = JSON.parse(countries);
                var geo = topojson.feature(parsed, parsed.objects.countries);
                var country = _.find(geo.features, function(g) {
                    return g.properties.name.toLowerCase() === countryName.toLowerCase();
                });
            } catch (e) {
                logger.error(e);
                error = 'Exception thrown';
            }
        }
        callback(error, country);
    });
};
var findClosestCity = function(list, longitude, latitude, callback) {
    var found = _.min(list.features, function(d) {
        var difLongitude = d.properties.LONGITUDE - longitude;
        var difLatitude = d.properties.LATITUDE - latitude;
        var diff = Math.sqrt(Math.pow(difLongitude, 2) + Math.pow(difLatitude, 2));
        return diff;
    });
    if (found) {
        var properties = found.properties;
        logger.info('City found: \'' + properties.NAME + ' (' + properties.LONGITUDE + ', ' + properties.LATITUDE + ')\'.');
        var result = {
            name: properties.NAME,
            latitude: properties.LATITUDE,
            longitude: properties.LONGITUDE
        };
    } else {
        logger.error('No city found.');
        var error = 'No city found';
    }
    callback(error, result);
};