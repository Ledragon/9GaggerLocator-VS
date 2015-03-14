module app.Controllers {
    interface InavBarScope extends ng.IScope {
        vm: navBarController;
    }

    interface InavBarController {
        currentUser: any;
    }

    class navBarController {
        static controllerId = 'navBarController';
        currentUser: any;
        constructor($scope: InavBarScope, identityService: Services.IidentityService) {
            $scope.vm = this;
            var self = this;
            $scope.$watch(() => identityService.currentUser,() => {
                self.currentUser = identityService.currentUser;
            });
        }
    }

    var app = angular.module('app');
    app.controller(navBarController.controllerId,
        ['$scope', 'identityService',
            ($scope, identityService) =>
                new navBarController($scope, identityService)]);
}