/// <reference path="../../typings/angularjs/angular.d.ts" />
module app {

    'use strict';
    var app = angular.module('app', ['ui.router']);
    app.run(['$http', 'identityService', ($http, identityService) => {
        $http.get('/user').then(function (data) {
            if (data.data) {
                identityService.currentUser = data.data;
            }
        });
    }]);
}
