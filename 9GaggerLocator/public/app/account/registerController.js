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
                var _this = this;
                var newUser = {
                    username: this.userName,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName
                };
                console.log(newUser);
                var self = this;
                this.authenticationService.createUser(newUser).then(function () {
                    _this.notifierService.success('user created');
                    _this.$state.go('overview');
                }, function (reason) {
                    var message;
                    if (reason.indexOf('E11000') > -1) {
                        message = 'This user name already exists.';
                        self.registerForm.userName.$setValidity('User name already exists', false);
                    }
                    else {
                        message = 'User creation failed.';
                    }
                    self.notifierService.error(message);
                });
            };
            registerController.controllerId = 'RegisterController';
            return registerController;
        })();
        var userViewModel = (function () {
            function userViewModel() {
            }
            return userViewModel;
        })();
        var app = angular.module('app');
        app.controller(registerController.controllerId, [
            '$scope',
            '$state',
            'authenticationService',
            'notifierService',
            function ($scope, $state, authenticationService, notifierService) { return new registerController($scope, $state, authenticationService, notifierService); }
        ]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=registerController.js.map