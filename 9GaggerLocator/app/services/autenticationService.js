/// <reference path="../account/userresource.ts" />
var app;
(function (app_1) {
    var Services;
    (function (Services) {
        var authenticationService = (function () {
            function authenticationService($http, $q, identityService, userResource) {
                this.$http = $http;
                this.$q = $q;
                this.identityService = identityService;
                this.userResource = userResource;
            }
            authenticationService.prototype.login = function (userName, password) {
                var _this = this;
                var defered = this.$q.defer();
                var body = {
                    username: userName,
                    password: password
                };
                this.$http.post('login', body).then(function (response) {
                    if (response.data.success) {
                        var user = new _this.userResource();
                        angular.extend(user, response.data.user);
                        _this.identityService.currentUser = user;
                        defered.resolve(true);
                    }
                    else {
                        defered.resolve(false);
                    }
                }, function (reason) {
                    defered.reject(reason);
                });
                return defered.promise;
            };
            authenticationService.prototype.logoutUser = function () {
                var deferred = this.$q.defer();
                var self = this;
                this.$http.post('/logout', { logout: true }).then(function () {
                    self.identityService.currentUser = undefined;
                    deferred.resolve();
                });
                return deferred.promise;
            };
            authenticationService.prototype.authorizeCurrentUserForRoute = function (role) {
                if (this.identityService.isAuthorized(role)) {
                    return false;
                }
                else {
                    return this.$q.reject('Not authorized');
                }
            };
            authenticationService.prototype.authorizeAuthenticatedUserForRoute = function () {
                if (this.identityService.isAuthenticated()) {
                    return false;
                }
                else {
                    return this.$q.reject('Not authenticated');
                }
            };
            authenticationService.prototype.createUser = function (user) {
                var deferred = this.$q.defer();
                var userResource = new this.userResource(user);
                var self = this;
                userResource.$save().then(function (newUser) {
                    self.identityService.currentUser = newUser;
                    deferred.resolve();
                }, function (response) {
                    deferred.reject(response.data.reason);
                });
                return deferred.promise;
            };
            authenticationService.serviceId = 'authenticationService';
            return authenticationService;
        })();
        var app = angular.module('app');
        app.factory(authenticationService.serviceId, [
            '$http', '$q', 'identityService', 'userResource',
            function ($http, $q, identityService, userResource) { return new authenticationService($http, $q, identityService, userResource); }
        ]);
    })(Services = app_1.Services || (app_1.Services = {}));
})(app || (app = {}));
