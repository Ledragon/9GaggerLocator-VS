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
        constructor($scope: InavBarScope,
            private $state:ng.ui.IStateService,
            identityService: Services.IidentityService,
            private authenticationService: Services.IauthenticationService,
            private notifierService:Services.InotificationService) {
            $scope.vm = this;
            var self = this;
            $scope.$watch(() => identityService.currentUser,() => {
                self.currentUser = identityService.currentUser;
            });
        }
        signout(): void{
            var self = this;
            this.authenticationService.logoutUser().then(() => {
                self.notifierService.success('You have successfully signed out');
                self.$state.go('login');
            });
        }
    }

    var app = angular.module('app');
    app.controller(navBarController.controllerId,
        ['$scope', '$state', 'identityService','authenticationService','notifierService',
            ($scope, $state, identityService, authenticationService, notifierService) =>
                new navBarController($scope, $state, identityService, authenticationService, notifierService)]);
}