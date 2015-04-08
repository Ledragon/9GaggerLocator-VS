/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var registerController = (function () {
            function registerController($scope, $state, authenticationService, notifierService) {
                this.$scope = $scope;
                this.$state = $state;
                this.authenticationService = authenticationService;
                this.notifierService = notifierService;
            }
            registerController.prototype.register = function () {
                var newUser = {
                    username: this.userName,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName
                };
                console.log(newUser);
                var self = this;
                this.authenticationService.createUser(newUser).then(function () {
                    self.notifierService.success('user created');
                    self.$state.go('overview');
                }, function (reason) {
                    self.notifierService.error('User creation failed.');
                });
            };
            registerController.controllerId = 'RegisterController';
            return registerController;
        })();
        var app = angular.module('app');
        app.controller(registerController.controllerId, ['$scope', '$state', 'authenticationService', 'notifierService', function ($scope, $state, authenticationService, notifierService) { return new registerController($scope, $state, authenticationService, notifierService); }]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=registerController.js.map