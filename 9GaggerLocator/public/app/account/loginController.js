/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var LoginController = (function () {
            //signin: (username, password) => void;
            function LoginController(authenticationService, notifierService) {
                this.authenticationService = authenticationService;
                this.notifierService = notifierService;
                this.userName = '';
                this.password = '';
            }
            LoginController.prototype.signin = function () {
                var self = this;
                console.log('Login with user name ' + this.userName + ' and password ' + this.password);
                this.authenticationService.login(this.userName, this.password).then(function (success) {
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
            };
            return LoginController;
        })();
        var app = angular.module('app');
        app.controller('LoginController', [
            'authenticationService',
            'notifierService',
            function (authenticationService, notifierService) { return new LoginController(authenticationService, notifierService); }
        ]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=loginController.js.map