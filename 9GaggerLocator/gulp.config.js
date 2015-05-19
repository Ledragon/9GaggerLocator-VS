module.exports = function () {
    var client = 'public/';
    var app = client + 'app/';

    var config = {
        //all js files for vet
        alljs: [
            app + '**/*.js',
            client + 'framework/**/*.js',
            './*.js'
        ],
        /*
        Bower and NPM locations
        */
        bower: {
            json: require('./bower.json'),
            directory: (client + 'bower/'),
            ignorePath: '../..'
        },
        client: client,
        getWiredepOptions: getWiredepOptions,
        index: client + 'index.html',
        injectOptions:{
            ignorePath: client,
            addRootSlash:false
        },
        js: [
            app + '**/*.module.js',
            app + '**/*.js',
            client+'scripts/**/*.js',
            //'framework/**/*.js',
            '!' + app + '**/*.spec.js'
        ]
    };

    function getWiredepOptions() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    }

    return config;
};