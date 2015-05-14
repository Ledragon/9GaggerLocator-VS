var path = require('path');
var fs = require('fs');
var logger = require('../utilities/logger');
var _ = require('lodash');

exports.getCountries110m = function(callback) {
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

exports.getClosestCity = function(longitude, latitude, callback) {
    logger.info('Finding closest city to (\'' + longitude + '\', \'' + latitude + '\').');
    var url = path.join(__dirname, '../data/populated-places-10m.geo.json');
    fs.readFile(url, function(error, data) {
        var result = {};
        if (error) {
            logger.error(error);
        } else {
            var object = JSON.parse(data);
            var found = _.min(object.features, function(d) {
                var difLongitude = d.properties.LONGITUDE - longitude;
                var difLatitude = d.properties.LATITUDE - latitude;
                var diff = Math.sqrt(Math.pow(difLongitude, 2) + Math.pow(difLatitude, 2));
                return diff;
            });
            if (found) {
                var properties = found.properties;
                logger.info('City found: \'' + properties.NAME + ' (' + properties.LONGITUDE + ', ' + properties.LATITUDE + ')\'.');
                result = {
                    name: properties.NAME,
                    latitude: properties.LATITUDE,
                    longitude: properties.LONGITUDE
                };
            } else {
                logger.error('No city found.');
            }
        }
        callback(error, result);
    });
};