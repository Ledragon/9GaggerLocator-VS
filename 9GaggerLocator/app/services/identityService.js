var app;
(function (app_1) {
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
    })(Services = app_1.Services || (app_1.Services = {}));
})(app || (app = {}));
