var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var navBarController = (function () {
            function navBarController($scope, $state, identityService, authenticationService, notifierService) {
                this.$state = $state;
                this.authenticationService = authenticationService;
                this.notifierService = notifierService;
                $scope.vm = this;
                var self = this;
                $scope.$watch(function () { return identityService.currentUser; }, function () {
                    self.currentUser = identityService.currentUser;
                });
            }
            navBarController.prototype.signout = function () {
                var self = this;
                this.authenticationService.logoutUser().then(function () {
                    self.notifierService.success('You have successfully signed out');
                    self.$state.go('login');
                });
            };
            navBarController.controllerId = 'navBarController';
            return navBarController;
        })();
        var app = angular.module('app');
        app.controller(navBarController.controllerId, [
            '$scope',
            '$state',
            'identityService',
            'authenticationService',
            'notifierService',
            function ($scope, $state, identityService, authenticationService, notifierService) { return new navBarController($scope, $state, identityService, authenticationService, notifierService); }
        ]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=navBarController.js.map