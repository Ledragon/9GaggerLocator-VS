/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
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
            var to;
            $http.get('/user').then(function (data) {
                if (data.data) {
                    console.log('User found on server');
                    var user = new userResource();
                    angular.extend(user, data.data);
                    identityService.currentUser = user;
                    if (to) {
                        console.log(to);
                        $state.go(to);
                    }
                }
            });
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if (error === 'Not authorized') {
                    $state.go('notAuthorized');
                }
                else if (error === 'Not authenticated') {
                    console.log('User is not authenticated');
                    console.log(toState.name);
                    to = toState.name;
                    $state.go('login');
                }
            });
        }
    ]);
})(app || (app = {}));
//# sourceMappingURL=app.js.map