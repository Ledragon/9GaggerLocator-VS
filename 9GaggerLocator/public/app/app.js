/// <reference path="../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    'use strict';
    var app = angular.module('app', ['ui.router']);
    app.run(['$http', 'identityService', function ($http, identityService) {
        $http.get('/user').then(function (data) {
            if (data.data) {
                identityService.currentUser = data.data;
            }
        });
    }]);
})(app || (app = {}));
//# sourceMappingURL=app.js.map