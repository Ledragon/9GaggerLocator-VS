/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
module Directives {

    interface ImapDirectiveScope extends ng.IScope {
        isLoading: boolean;
        users: any;
        me: any;
    }

    var app = angular.module('app');
    app.directive('ldMap', ['geoService', 'userService', (geoService: any, userService: any) => new mapDirective(geoService, userService)]);

    class mapDirective implements ng.IDirective {
        restrict = 'E';
        template = '<div><span class="fa fa-spin fa-spinner" ng-show="isLoading"></span></div>';
        replace = true;
        link: (scope: any, element: any, attributes: any) => {};

        private colors = ['rgb(254,229,217)', 'rgb(165,15,21)'];
        private colorScale = d3.scale.linear().range(this.colors);
        scope: any;

        constructor(private geoService: app.Services.IgeoService, private userService: app.Services.IuserService) {
            this.scope = {
                users: '=',
                me: '='
            };
            this.link = this._link.bind(this);
        }

        _link(scope: ImapDirectiveScope, element: ng.IAugmentedJQuery, attributes: any) {
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
                var usersGroup = svg.append('g').classed('users-group', true);

                var self = this;

                var mercatorProjection = d3.geo.mercator()
                    .center([0, 0])
                    .translate([width / 2, height / 2])
                    .scale(width / 8);
                var pathGenerator = d3.geo.path().projection(mercatorProjection);
                var geo: GeoJSON.FeatureCollection;
                this.geoService.getCountries().then((countries) => {
                    geo = self.geoService.getGeoJSON(countries);


                    countriesGroup.selectAll('path')
                        .data(geo.features)
                        .enter()
                        .append('g')
                        .attr('id', (d: any, i: any) => d.properties.adm0_a3)
                        .append('path')
                        .attr('d', (d: any, i: any) => pathGenerator(d))
                        .classed('normal', true);

                    this.userService.getNumberByCountry().then((grouped: any) => {
                        var scale: any = self.colorScale;
                        scale.domain([
                            0, d3.max(grouped, (g: any) => g.count)
                        ]);

                        //self.drawCircles(usersGroup, grouped, geo, pathGenerator);
                        grouped.forEach((group: any) => {
                            var country = _.find(geo.features, (g: GeoJSON.Feature) => { return g.properties.name === group.country; });
                            if (country) {
                                countriesGroup.select(`#${country.properties.adm0_a3}`)
                                    .select('path')
                                    .style('fill', scale(group.count));
                            }
                        });
                    });
                });


                scope.$watch(() => scope.me, (newValue) => {
                    this.centerOnPosition(newValue, mercatorProjection, countriesGroup, geo);
                    //var proj = mercatorProjection.center([scope.me.coords.longitude, scope.me.coords.latitude]).scale(4000);
                    //var projected = proj([scope.me.coords.longitude, scope.me.coords.latitude]);
                    //var gen = d3.geo.path().projection(proj);
                    //countriesGroup.selectAll('path')
                    //    .data(geo.features)
                    //    .transition()
                    //    .attr('d', (d: any) => pathGenerator(d));
                    //usersGroup
                    //    .append('circle')
                    //    .transition()
                    //    .attr({
                    //        'cx': projected[0],
                    //        'cy': projected[1],
                    //        'r': 2
                    //    });
                });

            } catch (e) {
                console.log(e);
            }
            scope.isLoading = false;
        }

        private centerOnPosition(position: Position, mercatorProjection:D3.Geo.Projection, countriesGroup:D3.Selection, geo:any) {
            var proj = mercatorProjection.center([position.coords.longitude, position.coords.latitude]).scale(8000);
            var projected = proj([position.coords.longitude, position.coords.latitude]);
            var gen = d3.geo.path().projection(proj);
            countriesGroup.selectAll('path')
                .data(geo.features)
                .transition()
                .attr('d', (d: any) => gen(d));
            d3.select('.users-group')
                .append('circle')
                .transition()
                .attr({
                    'cx': projected[0],
                    'cy': projected[1],
                    'r': 2
                });
        }

        private drawCircles(usersGroup: any, grouped: any, geo: any, pathGenerator: any) {
            var group = usersGroup.selectAll('circle')
                .data(grouped)
                .enter()
                .append('g')
                .attr('transform', (d: any, i: any) => {
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
                    'text-anchor': 'middle'
                })
                .text((d: any, i: any) => d.count);
        }
    };
}