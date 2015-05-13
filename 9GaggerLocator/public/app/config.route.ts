/// <reference path="../../typings/angularjs/angular.d.ts" />
module app {
    var app = angular.module('app');
    var routeRoleChecks = {
        admin: {
            auth(authenticationService: Services.IauthenticationService) {
                return authenticationService.authorizeCurrentUserForRoute('admin');
            }
        }
    };

    var routeAuthenticationCheck = {
        isAuthenticated: {
            auth(authenticationService: Services.IauthenticationService): any {
                return authenticationService.authorizeAuthenticatedUserForRoute();
            }
        }
    };
    app.config([
        '$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
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
                    controllerAs: 'vm',
                    resolve: routeAuthenticationCheck.isAuthenticated
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'app/account/profile.html',
                    controller: 'profileController',
                    controllerAs: 'vm',
                    resolve: routeAuthenticationCheck.isAuthenticated
                })
                .state('chat', {
                    url: '/chat',
                    templateUrl: 'app/interaction/chat.html',
                    controller: 'chatController',
                    controllerAs: 'vm',
                    resolve: routeAuthenticationCheck.isAuthenticated
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
        }
    ]);
}