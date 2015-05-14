var express = require('express');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function (app, config) {

    app.set('views', config.rootPath + '/public/');
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');

    app.use(logger('dev'));

    app.use(cookieParser());
    //app.use(bodyParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'nice unicorns'
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(path.join(__dirname, 'data')));
    app.use(express.static(config.rootPath + '/public/'));
    
};