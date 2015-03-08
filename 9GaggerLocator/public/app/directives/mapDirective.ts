/// <reference path="../../../typings/d3/d3.d.ts"/>
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
module Directives {
    var app = angular.module('app');
    app.directive('ldMap',() => new mapDirective());

    class mapDirective implements ng.IDirective {
        restrict = 'E';
        template = '<div><span class="fa fa-spin fa-spinner" ng-show="isLoading"></span></div>';
        replace = true;
        link(scope, element, attributes) {
            try {
                scope.isLoading = true;
                var svg = d3.select(element[0])
                    .append('svg')
                    .attr('width', '100%');
                var rect = svg.append('rect')
                    .attr({
                    'width': '100%',
                    'height': '100%'
                })
                    .style({
                    'fill': '#ddd'
                });
                var data = new Array(10);
                svg.selectAll('.test')
                    .data(data)
                    .enter()
                    .append('rect')
                    .classed('test', true)
                    .attr({
                    'x': function (d, i) {
                        return 0;
                    },
                    'y': function (d, i) {
                        return i * 10;
                    },
                    'width': function (d, i) {
                        return i * 3;
                    },
                    'height': function (d, i) {
                        return 8;
                    },
                })
                //framework.chart.init(svg);
            } catch (e) {
                console.log(e);
            }
            scope.isLoading = false;
        }
    };
}