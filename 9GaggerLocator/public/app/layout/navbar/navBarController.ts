module app.Controllers {
    interface InavBarScope extends ng.IScope {
        vm: navBarController;
    }

    interface InavBarController {
        currentUser: any;
        signout(): void;
    }

    class navBarController implements InavBarController {
        static controllerId = 'navBarController';
        currentUser: any;
        constructor($scope: InavBarScope, identityService: Services.IidentityService) {
            $scope.vm = this;
            var self = this;
            $scope.$watch(() => identityService.currentUser,() => {
                self.currentUser = identityService.currentUser;
            });
        }
        signout(): void{

        }
    }

    var app = angular.module('app');
    app.controller(navBarController.controllerId,
        ['$scope', 'identityService',
            ($scope, identityService) =>
                new navBarController($scope, identityService)]);
}