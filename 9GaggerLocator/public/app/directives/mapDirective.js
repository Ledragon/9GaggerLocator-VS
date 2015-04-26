/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
var Directives;
(function (Directives) {
    var app = angular.module('app');
    app.directive('ldMap', ['geoService', 'userService', function (geoService, userService) { return new mapDirective(geoService, userService); }]);
    var mapDirective = (function () {
        function mapDirective(geoService, userService) {
            this.geoService = geoService;
            this.userService = userService;
            this.restrict = 'E';
            this.template = '<div><span class="fa fa-spin fa-spinner" ng-show="isLoading"></span></div>';
            this.replace = true;
            this.link = this._link.bind(this);
        }
        mapDirective.prototype._link = function (scope, element, attributes) {
            var _this = this;
            try {
                scope.isLoading = true;
                var width = element.width();
                var height = width * 3 / 4;
                var svg = d3.select(element[0]).append('svg').attr({
                    width: width,
                    height: height
                });
                var countriesGroup = svg.append('g');
                var usersGroup = svg.append('g');
                var self = this;
                this.geoService.getCountries().then(function (countries) {
                    var geo = self.geoService.getGeoJSON(countries);
                    var mercatorProjection = d3.geo.mercator().center([0, 0]).translate([width / 2, height / 2]).scale(width / 8);
                    var pathGenerator = d3.geo.path().projection(mercatorProjection);
                    countriesGroup.selectAll('path').data(geo.features).enter().append('g').attr('id', function (d, i) { return d.properties.adm0_a3; }).append('path').attr('d', function (d, i) { return pathGenerator(d); }).classed('normal', true);
                    _this.userService.getNumberByCountry().then(function (grouped) {
                        var group = usersGroup.selectAll('circle').data(grouped).enter().append('g').attr('transform', function (d, i) {
                            var country = _.find(geo.features, function (g) {
                                return g.properties.name === d.country;
                            });
                            if (country) {
                                var center = pathGenerator.centroid(country);
                                return "translate(" + center[0] + "," + center[1] + ")";
                            }
                        });
                        group.append('circle').attr({
                            'r': 10
                        });
                        group.append('text').attr({
                            'fill': 'white',
                            'y': 5,
                            'text-anchor': 'middle'
                        }).text(function (d, i) { return d.count; });
                        //enter.append('circle')
                        //    .attr({
                        //        'cx': (d, i) => {
                        //            var country = _.find(geo.features, (g: GeoJSON.Feature) => { return g.properties.name === d.country; });
                        //            if (country) {
                        //                var center = pathGenerator.centroid(country);
                        //                return center[0];
                        //            }
                        //        },
                        //        'cy': (d, i) => {
                        //            var country = _.find(geo.features, (g: GeoJSON.Feature) => { return g.properties.name === d.country; });
                        //            if (country) {
                        //                var center = pathGenerator.centroid(country);
                        //                return center[1];
                        //            }
                        //        },
                        //        'r': 10
                        //    });
                    });
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
//# sourceMappingURL=mapDirective.js.map