/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var OverviewController = (function () {
            function OverviewController(userService) {
                var self = this;
                userService.getAll().then(function (data) {
                    self.users = data;
                });
            }
            return OverviewController;
        })();
        var app = angular.module('app');
        app.controller('OverviewController', ['userService', OverviewController]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=OverviewController.js.map