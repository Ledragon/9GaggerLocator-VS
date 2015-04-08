/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
module app.Controllers{
    class registerController{
        static controllerId='RegisterController';
        userName:string;
        password:string;
        firstName:string;
        lastName:string;

        constructor(private $scope:ng.IScope, private $state:ng.ui.IStateService, private authenticationService, private notifierService) {
        }

        register(){
            var newUser = {
                username: this.userName,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName

            }
            console.log(newUser);
            var self=this;
            this.authenticationService.createUser(newUser)
                .then(function () {
                    self.notifierService.success('user created');
                    self.$state.go('overview');
                }, function (reason) {
                    self.notifierService.error('User creation failed.');
                });
        }
    }

    var app = angular.module('app');
    app.controller(registerController.controllerId, 
        ['$scope','$state','authenticationService', 'notifierService', 
            ($scope,$state, authenticationService, notifierService)=>
            new registerController($scope,$state, authenticationService, notifierService)]);
}