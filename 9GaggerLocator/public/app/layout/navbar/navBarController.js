var app;
(function (app_1) {
    var Controllers;
    (function (Controllers) {
        var navBarController = (function () {
            function navBarController($scope, $state, identityService, authenticationService, notifierService, realTimeService) {
                this.$state = $state;
                this.authenticationService = authenticationService;
                this.notifierService = notifierService;
                this.realTimeService = realTimeService;
                $scope.vm = this;
                var self = this;
                $scope.$watch(function () { return identityService.currentUser; }, function () {
                    self.currentUser = identityService.currentUser;
                });
                $scope.$watch(function () { return $state.current; }, function () {
                    self.currentState = $state.current.name;
                });
                realTimeService.on('message-sent', function (userName, message) {
                    if (message.to.userName === identityService.currentUser.username) {
                        notifierService.success("You received a message from " + message.from.username);
                    }
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
            '$scope', '$state', 'identityService', 'authenticationService', 'notifierService', 'realTimeService',
            function ($scope, $state, identityService, authenticationService, notifierService, realTimeService) {
                return new navBarController($scope, $state, identityService, authenticationService, notifierService, realTimeService);
            }
        ]);
    })(Controllers = app_1.Controllers || (app_1.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=navBarController.js.map