/// <reference path="../account/userresource.ts" />
var app;
(function (_app) {
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
                var defered = this.$q.defer();
                var body = {
                    username: userName,
                    password: password
                };
                var self = this;
                this.$http.post('login', body).then(function (response) {
                    if (response.data.success) {
                        var user = new self.userResource();
                        angular.extend(user, response.data.user);
                        self.identityService.currentUser = user;
                        defered.resolve(true);
                    }
                    else {
                        defered.resolve(false);
                    }
                }, function (response) {
                    defered.reject();
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
            authenticationService.serviceId = 'authenticationService';
            return authenticationService;
        })();
        var app = angular.module('app');
        app.factory(authenticationService.serviceId, [
            '$http',
            '$q',
            'identityService',
            'userResource',
            function ($http, $q, identifierService, userResource) { return new authenticationService($http, $q, identifierService, userResource); }
        ]);
    })(Services = _app.Services || (_app.Services = {}));
})(app || (app = {}));
//# sourceMappingURL=autenticationService.js.map