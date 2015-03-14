/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.Controllers {

    interface ILoginController {
        userName: string;
        password: string;
        signin: (username, password) => void;
    }

    class LoginController implements ILoginController {
        userName: string;
        password: string;
        //signin: (username, password) => void;

        constructor(private authenticationService:Services.IauthenticationService, private notifierService:Services.InotificationSrvice) {
            this.userName = '';
            this.password = '';
        }

        signin() {
            var self = this;
            console.log('Login with user name ' + this.userName + ' and password ' + this.password);
            this.authenticationService.login(this.userName, this.password).then((success) => {
                if (success) {
                    self.notifierService.success('Successfully logged in as ' + self.userName);
                }
                else {
                    self.notifierService.error('Login failed for user ' + self.userName);
                }
            });
            //var body = {
            //    username: this.userName,
            //    password: this.password
            //};
            //var self = this;
            ////TODO for deployment, change login url
            //this.$http.post('http://localhost:3030/login', body).then(function (response: any) {
            //    if (response.data.success) {
            //        self.notifierService.success('Successfully logged in as ' + self.userName);
            //        self.identityService.currentUser = response.data.user;
            //    } else {
            //        self.notifierService.error('Login failed for user ' + self.userName);
            //    }
            //},(response) => {
            //        self.notifierService.error('Connection failed. Check the availability of the server.');
            //    });
        }

    }

    var app = angular.module('app');
    app.controller('LoginController', [
        'authenticationService', 'notifierService',
        (authenticationService, notifierService) =>
            new LoginController(authenticationService, notifierService)
    ]);
}