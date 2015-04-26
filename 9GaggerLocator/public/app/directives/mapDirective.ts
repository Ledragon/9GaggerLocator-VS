/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
module Directives {
    var app = angular.module('app');
    app.directive('ldMap', ['geoService', 'userService', (geoService, userService) => new mapDirective(geoService, userService)]);

    class mapDirective implements ng.IDirective {
        public restrict = 'E';
        public template = '<div><span class="fa fa-spin fa-spinner" ng-show="isLoading"></span></div>';
        public replace = true;
        public link: (scope, element, attributes) => {};

        constructor(private geoService: app.Services.IgeoService, private userService: app.Services.IuserService) {
            this.link = this._link.bind(this);
        }

        public _link(scope, element: ng.IAugmentedJQuery, attributes) {
            try {
                scope.isLoading = true;
                var width = element.width();
                var height = width * 3 / 4;
                var svg = d3.select(element[0])
                    .append('svg')
                    .attr({
                        width: width,
                        height: height
                    });

                var countriesGroup = svg.append('g');
                var usersGroup = svg.append('g');

                var self = this;
                this.geoService.getCountries().then((countries) => {
                    var geo = self.geoService.getGeoJSON(countries);

                    var mercatorProjection = d3.geo.mercator()
                        .center([0, 0])
                        .translate([width / 2, height / 2])
                        .scale(width / 8);

                    var pathGenerator = d3.geo.path().projection(mercatorProjection);

                    countriesGroup.selectAll('path')
                        .data(geo.features)
                        .enter()
                        .append('g')
                        .attr('id', (d, i) => d.properties.adm0_a3)
                        .append('path')
                        .attr('d', (d, i) => pathGenerator(d))
                        .classed('normal', true);

                    this.userService.getNumberByCountry().then((grouped) => {
                        var group = usersGroup.selectAll('circle')
                            .data(grouped)
                            .enter()
                            .append('g')
                            .attr('transform', (d, i) => {
                                var country = _.find(geo.features, (g: GeoJSON.Feature) => { return g.properties.name === d.country; });
                                if (country) {
                                    var center = pathGenerator.centroid(country);
                                    return `translate(${center[0]},${center[1]})`;
                                }
                            });
                        group.append('circle')
                            .attr({
                                'r': 10
                            });
                        group.append('text')
                            .attr({
                                'fill': 'white',
                                'y': 5,
                                'text-anchor':'middle'
                            })
                            .text((d, i) => d.count);
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

            } catch (e) {
                console.log(e);
            }
            scope.isLoading = false;
        }
    };
}