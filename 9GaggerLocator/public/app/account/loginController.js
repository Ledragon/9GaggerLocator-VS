/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var LoginController = (function () {
            function LoginController($state, authenticationService, notifierService) {
                this.$state = $state;
                this.authenticationService = authenticationService;
                this.notifierService = notifierService;
                this.userName = '';
                this.password = '';
            }
            LoginController.prototype.signin = function () {
                var self = this;
                this.authenticationService.login(this.userName, this.password).then(function (success) {
                    if (success) {
                        self.notifierService.success("Successfully logged in as " + self.userName);
                        self.$state.go('overview');
                    }
                    else {
                        self.notifierService.error("Login failed for user " + self.userName);
                    }
                });
            };
            return LoginController;
        })();
        var app = angular.module('app');
        app.controller('LoginController', [
            '$state',
            'authenticationService',
            'notifierService',
            function ($state, authenticationService, notifierService) { return new LoginController($state, authenticationService, notifierService); }
        ]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=loginController.js.map