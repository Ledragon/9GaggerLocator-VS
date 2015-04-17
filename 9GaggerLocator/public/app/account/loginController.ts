/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.Controllers {

    interface ILoginController {
        userName: string;
        password: string;
        signin: () => void;
    }

    class LoginController implements ILoginController {
        public userName: string;
        public password: string;

        constructor(
            private $state: ng.ui.IStateService,
            private authenticationService: Services.IauthenticationService,
            private notifierService: Services.InotificationService) {
            this.userName = '';
            this.password = '';
        }

        public signin() {
            var self = this;
            this.authenticationService.login(this.userName, this.password).then((success) => {
                if (success) {
                    self.notifierService.success(`Successfully logged in as ${self.userName}`);
                    self.$state.go('overview');
                } else {
                    self.notifierService.error(`Login failed for user ${self.userName}`);
                }
            });
        }

    }

    var app = angular.module('app');
    app.controller('LoginController', [
        '$state', 'authenticationService', 'notifierService',
        ($state, authenticationService, notifierService) =>
        new LoginController($state, authenticationService, notifierService)
    ]);
}