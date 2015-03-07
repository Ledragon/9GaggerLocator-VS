var path = require('path');

var rootPath = path.normalize(__dirname + '../../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/9gaggerLocator',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        //TODO
        db: 'undefined',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}