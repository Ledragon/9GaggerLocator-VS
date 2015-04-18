var d3 = require('d3');
var path = require('path');
var fs = require('fs');
var logger = require('../utilities/logger');
exports.getCountries = function (request, response) {
    console.log('Reading countries');
    var url = path.join(__dirname, '../data/countries-110m.topo.json');
    fs.readFile(url, function (error, data) {
            if (error) {
                logger.error(error);
                response.status(404);
                response.send(error);
            }
            else {
                logger.success('Countries successfully read.');
                response.send(data);
            }
        });
}