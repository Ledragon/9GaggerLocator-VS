/// <reference path="../../typings/angularjs/angular.d.ts" />
module app{
        var app = angular.module('app');
        var routeRoleChecks = {
            admin: {
                auth(authenticationService) {
                    return authenticationService.authorizeCurrentUserForRoute('admin');
                }
            }
        };

        app.config(['$stateProvider', '$urlRouterProvider',($stateProvider, $urlRouterProvider) => {
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('notFound', {
                    url: '/notFound',
                    templateUrl: 'app/layout/special/notFound.html'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'app/layout/special/home.html'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/account/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'app/account/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'vm'
                })
                .state('overview', {
                    url: '/overview',
                    templateUrl: 'app/interaction/overview.html',
                    controller: 'OverviewController',
                    controllerAs: 'vm'
                })
                .state('notAuthorized', {
                    url: '/notauthorized',
                    templateUrl: 'app/layout/special/notAuthorized.html'
                })
                .state('users', {
                    url: '/admin/users',
                    templateUrl: 'app/admin/users.html',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    resolve: routeRoleChecks.admin
                });
        }]);
}