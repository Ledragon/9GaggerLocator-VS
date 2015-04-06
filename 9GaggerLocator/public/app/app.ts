/// <reference path="../../typings/angularjs/angular.d.ts" />
module app {
    'use strict';
    var app = angular.module('app', ['ui.router', 'ngResource']);

    app.run(['$http', '$rootScope', '$state', 'identityService', 'userResource',
        ($http, $rootScope: ng.IRootScopeService, $state: ng.ui.IStateService, identityService, userResource) => {
            $http.get('/user').then(function (data) {
                if (data.data) {
                    var user = new userResource();
                    angular.extend(user, data.data);
                    identityService.currentUser = user;
                }
            });

            $rootScope.$on('$stateChangeError', (event, toState: ng.ui.IState, toParams, fromState: ng.ui.IState, fromParams, error) => {
                if (error === 'Not authorized') {
                    $state.go('notAuthorized');
                }
            });
        }]);
}
