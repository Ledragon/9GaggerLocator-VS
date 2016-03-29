module app.Directives {
    export class ldNavBarDirective implements angular.IDirective {
        static directiveId ='ldNavBarDirective';

        restrict = 'E';
        templateUrl = 'app/layout/navbar/navbar.html';
        controller = 'navBarController';
        controllerAs = 'vm';

    }

    angular.module('app')
        .directive(ldNavBarDirective.directiveId, () => new ldNavBarDirective());

}