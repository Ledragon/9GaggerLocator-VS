/// <reference path="../../../typings/angularjs/angular.d.ts" />
module app.Controllers {

    class OverviewController {
        public users: Array<any>;

        constructor(userService:Services.IuserService) {
            var self = this;
            userService.getAll().then((data) => {
                self.users = data;
            });
        }
    }

    var app = angular.module('app');
    app.controller('OverviewController', ['userService', OverviewController]);

}