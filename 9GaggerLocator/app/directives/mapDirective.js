/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/framework.d.ts" />
var Directives;
(function (Directives) {
    var app = angular.module('app');
    app.directive('ldMap', [
        'geoService', 'userService',
        function (geoService, userService) {
            return new mapDirective(geoService, userService);
        }
    ]);
    var mapDirective = (function () {
        function mapDirective(geoService, userService) {
            this.geoService = geoService;
            this.userService = userService;
            this.restrict = 'A';
            this.replace = true;
            this.colors = ['rgb(254,229,217)', 'rgb(165,15,21)'];
            this.colorScale = d3.scale.linear().range(this.colors);
            this.scope = {
                users: '=',
                me: '=',
                selectedCountry: '='
            };
            this.link = this._link.bind(this);
        }
        mapDirective.prototype._link = function (scope, element, attributes) {
            var _this = this;
            try {
                scope.isLoading = true;
                var logger = new LeDragon.Framework.Utilities.logger(console);
                var map = new LeDragon.Framework.Map.map(element[0], logger, d3);
                this.geoService.getCountries().then(function (countries) {
                    map.drawCountries(countries);
                });
                scope.$watch(function () { return scope.me; }, function (newValue) {
                    if (scope.me) {
                        //map.addPosition(scope.me.coords.longitude, scope.me.coords.latitude);
                        map.centerOnPosition(scope.me.coords.longitude, scope.me.coords.latitude);
                    }
                });
                scope.$watch(function () { return scope.users; }, function () {
                    if (scope.users) {
                        scope.users.forEach(function (u) {
                            map.addPosition(u.longitude, u.latitude, 'yellow');
                        });
                    }
                });
                scope.$watch(function () { return scope.selectedCountry; }, function () {
                    console.log(scope.selectedCountry);
                    if (scope.selectedCountry && scope.selectedCountry.name) {
                        _this.geoService.getStates(scope.selectedCountry.name)
                            .then(function (data) {
                            map.drawStates(data);
                        });
                    }
                });
            }
            catch (e) {
                console.log(e);
            }
            scope.isLoading = false;
        };
        return mapDirective;
    })();
    ;
})(Directives || (Directives = {}));
