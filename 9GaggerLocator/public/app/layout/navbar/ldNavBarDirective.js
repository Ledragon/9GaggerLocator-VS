var app;
(function (app) {
    var Directives;
    (function (Directives) {
        var ldNavBarDirective = (function () {
            function ldNavBarDirective() {
                this.restrict = 'E';
                this.templateUrl = 'app/layout/navbar/navbar.html';
                this.controller = 'navBarController';
                this.controllerAs = 'vm';
            }
            ldNavBarDirective.directiveId = 'ldNavBarDirective';
            return ldNavBarDirective;
        }());
        Directives.ldNavBarDirective = ldNavBarDirective;
        angular.module('app')
            .directive(ldNavBarDirective.directiveId, function () { return new ldNavBarDirective(); });
    })(Directives = app.Directives || (app.Directives = {}));
})(app || (app = {}));
