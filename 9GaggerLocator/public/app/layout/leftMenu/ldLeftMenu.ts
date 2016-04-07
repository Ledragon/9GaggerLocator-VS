/// <reference path="../../../../typings/tsd.d.ts" />

module app.Layout {
    export class ldLeftMenu implements angular.IDirective {
        restrict = 'E';
        templateUrl = 'app/layout/leftMenu/leftMenu.html';
        replace = true;
        controllerAs = 'vm';
        controller = ldLeftMenuController;
    }

    export class ldLeftMenuController {
        static $inject: string[] = ['$scope', 'identityService'];
        currentUser: any;

        constructor($scope: angular.IScope,
            identityService: Services.IidentityService) {
            $scope.$watch(() => identityService.currentUser, () => {
                this.currentUser = identityService.currentUser;
            });
        }
    }

    angular.module('app')
        .directive('ldLeftMenu', [() => new ldLeftMenu()]);
}