/// <reference path="../../../../typings/tsd.d.ts" />

module app.Layout {
    export class ldLeftMenu implements angular.IDirective {
        restrict = 'E';
        templateUrl = 'app/layout/leftMenu/leftMenu.html';
    }

    angular.module('app')
        .directive('ldLeftMenu', [() => new ldLeftMenu()]);
}