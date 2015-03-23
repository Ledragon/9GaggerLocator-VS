var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var navBarController = (function () {
            function navBarController($scope, identityService) {
                $scope.vm = this;
                var self = this;
                $scope.$watch(function () { return identityService.currentUser; }, function () {
                    self.currentUser = identityService.currentUser;
                });
            }
            navBarController.prototype.signout = function () {
            };
            navBarController.controllerId = 'navBarController';
            return navBarController;
        })();
        var app = angular.module('app');
        app.controller(navBarController.controllerId, ['$scope', 'identityService', function ($scope, identityService) { return new navBarController($scope, identityService); }]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=navBarController.js.map