/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var navBarController = (function () {
            function navBarController($scope, $state, identityService, authenticationService, notifierService, realTimeService) {
                this.$state = $state;
                this.authenticationService = authenticationService;
                this.notifierService = notifierService;
                this.realTimeService = realTimeService;
                var self = this;
                this.unread = 0;
                $scope.$watch(function () { return identityService.currentUser; }, function () {
                    self.currentUser = identityService.currentUser;
                });
                $scope.$watch(function () { return $state.current; }, function () {
                    self.currentState = $state.current.name;
                });
                realTimeService.on('message-sent', function (userName, message) {
                    if (message.to.userName === identityService.currentUser.username) {
                        notifierService.success("You received a message from " + message.from.username);
                        self.unread += 1;
                        $scope.$apply();
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
            navBarController.$inject = ['$scope', '$state', 'identityService', 'authenticationService', 'notifierService', 'realTimeService'];
            return navBarController;
        })();
        angular.module('app')
            .controller(navBarController.controllerId, navBarController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
