/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Services;
    (function (Services) {
        var userService = (function () {
            function userService($q, $http) {
                this.$q = $q;
                this.$http = $http;
            }
            userService.prototype.getAll = function () {
                var defered = this.$q.defer();
                this.$http.get('/api/userNames').success(function (data, status) {
                    defered.resolve(data);
                }).error(function (reason) {
                    defered.reject(reason);
                });
                return defered.promise;
            };
            userService.prototype.getNumberByCountry = function () {
                var defered = this.$q.defer();
                this.getAll().then(function (users) {
                    var grouped = _.groupBy(users, function (u) { return u.country; });
                    var result = [];
                    for (var key in grouped) {
                        result.push({
                            country: key,
                            count: grouped[key].length
                        });
                    }
                    defered.resolve(result);
                });
                return defered.promise;
            };
            return userService;
        })();
        var app = angular.module('app').factory('userService', [
            '$q',
            '$http',
            function ($q, $http) { return new userService($q, $http); }
        ]);
    })(Services = _app.Services || (_app.Services = {}));
})(app || (app = {}));
//# sourceMappingURL=userService.js.map