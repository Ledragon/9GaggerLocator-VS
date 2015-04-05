/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var UsersController = (function () {
            function UsersController($scope, userService) {
                this.$scope = $scope;
                this.users = userService.getAll();
            }
            UsersController.controllerId = 'UsersController';
            return UsersController;
        })();
        var app = angular.module('app');
        app.controller(UsersController.controllerId, [
            '$scope',
            'userService',
            function ($scope, userService) { return new UsersController($scope, userService); }
        ]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=UsersController.js.map