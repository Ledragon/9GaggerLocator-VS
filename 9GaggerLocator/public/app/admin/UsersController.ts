/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.Controllers {
    interface IUsersControllerScope extends ng.IScope {
        vm: UsersController;
    }

    interface IUsersController {
    }

    class UsersController implements IUsersController {
        static controllerId: string = 'UsersController';
        users;
        constructor(private $scope: IUsersControllerScope, userService) {
            this.users = userService.getAll();
        }

    }

    var app = angular.module('app');
    app.controller(UsersController.controllerId, [
        '$scope','userService',
        ($scope, userService) => new UsersController($scope, userService)
    ]);
}