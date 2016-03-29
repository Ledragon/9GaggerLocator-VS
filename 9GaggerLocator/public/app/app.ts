/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
module app {
    'use strict';
    var app = angular.module('app', ['ui.router', 'ngResource', 'ngAnimate']);

    app.run([
        '$http', '$rootScope', '$state', 'identityService', 'userResource',
        ($http: angular.IHttpService, $rootScope: angular.IRootScopeService, 
        $state: angular.ui.IStateService, identityService: Services.IidentityService, userResource) => {
            var to;
            $http.get('/user').then(data => {
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

            $rootScope.$on('$stateChangeError', (event, toState: angular.ui.IState, toParams, fromState: angular.ui.IState, fromParams, error) => {
                if (error === 'Not authorized') {
                    $state.go('notAuthorized');
                } else if (error === 'Not authenticated') {
                    console.log('User is not authenticated');
                    console.log(toState.name);
                    to = toState.name;
                    $state.go('login');
                }
            });
        }
    ]);
}