var path = require('path');

var rootPath = path.normalize(path.join(__dirname, '../../'));

module.exports = {
    development: {
        db: 'mongodb://localhost/9gaggerLocator',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://username:password@ds031952.mongolab.com:31952/9gaggerlocator',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}
