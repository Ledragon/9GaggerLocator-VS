var app;
(function (_app) {
    var Services;
    (function (Services) {
        var identityService = (function () {
            function identityService() {
            }
            identityService.prototype.isAuthenticated = function () {
                return !!this.currentUser;
            };
            identityService.prototype.isAuthorized = function (role) {
                return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
            };
            identityService.serviceId = 'identityService';
            return identityService;
        })();
        var app = angular.module('app');
        app.factory(identityService.serviceId, [function () { return new identityService(); }]);
    })(Services = _app.Services || (_app.Services = {}));
})(app || (app = {}));
//# sourceMappingURL=identityService.js.map