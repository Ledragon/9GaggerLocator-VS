/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />
module app.Controllers {
    interface InavBarScope extends ng.IScope {
        vm: navBarController;
    }

    interface InavBarController {
        currentUser: any;
        signout(): void;
    }

    class navBarController implements InavBarController {
        public static controllerId = 'navBarController';
        public currentUser: any;
        private currentState: string;
        public unread: number;

        constructor($scope: InavBarScope,
            private $state: ng.ui.IStateService,
            identityService: Services.IidentityService,
            private authenticationService: Services.IauthenticationService,
            private notifierService: Services.InotificationService,
            private realTimeService: Services.IrealTimeService) {
            $scope.vm = this;
            var self = this;
            this.unread = 0;
            $scope.$watch(() => identityService.currentUser, () => {
                self.currentUser = identityService.currentUser;
            });
            $scope.$watch(() => $state.current, () => {
                self.currentState = $state.current.name;
            });

            realTimeService.on('message-sent', (userName, message) => {
                if (message.to.userName === identityService.currentUser.username) {
                    notifierService.success(`You received a message from ${message.from.username}`);
                    self.unread += 1;
                    $scope.$apply();
                }
            });
        }

        public signout(): void {
            var self = this;
            this.authenticationService.logoutUser().then(() => {
                self.notifierService.success('You have successfully signed out');
                self.$state.go('login');
            });
        }
    }

    var app = angular.module('app');
    app.controller(navBarController.controllerId,
    [
        '$scope', '$state', 'identityService', 'authenticationService', 'notifierService', 'realTimeService',
        ($scope, $state, identityService, authenticationService, notifierService, realTimeService) =>
        new navBarController($scope, $state, identityService, authenticationService, notifierService, realTimeService)
    ]);
}