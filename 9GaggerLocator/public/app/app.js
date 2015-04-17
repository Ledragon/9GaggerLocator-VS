/// <reference path="../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    'use strict';
    var app = angular.module('app', ['ui.router', 'ngResource']);
    app.run([
        '$http',
        '$rootScope',
        '$state',
        'identityService',
        'userResource',
        function ($http, $rootScope, $state, identityService, userResource) {
            $http.get('/user').then(function (data) {
                if (data.data) {
                    var user = new userResource();
                    angular.extend(user, data.data);
                    identityService.currentUser = user;
                }
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error === 'Not authorized') {
                    $state.go('notAuthorized');
                }
            });
        }
    ]);
})(app || (app = {}));
//# sourceMappingURL=app.js.map