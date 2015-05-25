/// <reference path="../../../typings/d3/d3.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../scripts/framework.d.ts" />
module Directives {

    interface ImapDirectiveScope extends ng.IScope {
        isLoading: boolean;
        users: any;
        me: any;
        states:any;
    }

    var app = angular.module('app');
    app.directive('ldMap', [
        'geoService', 'userService',
        (geoService: any, userService: any) =>
        new mapDirective(geoService, userService)
    ]);

    class mapDirective implements ng.IDirective {
        restrict = 'A';
        replace = true;
        link: (scope: any, element: any, attributes: any) => {};

        private colors = ['rgb(254,229,217)', 'rgb(165,15,21)'];
        private colorScale = d3.scale.linear().range(this.colors);
        scope: any;
        private _states;

        constructor(private geoService: app.Services.IgeoService,
            private userService: app.Services.IuserService) {
            this.scope = {
                users: '=',
                me: '=',
                states:'='
            };
            this.link = this._link.bind(this);
        }

        _link(scope: ImapDirectiveScope, element: ng.IAugmentedJQuery, attributes: any) {
            try {
                scope.isLoading = true;
                var logger = new LeDragon.Framework.Utilities.logger(console);
                var map = new LeDragon.Framework.Map.map(element[0], logger, d3);
                this.geoService.getCountries().then((countries) => {
                    map.drawCountries(countries);
                });

                scope.$watch(() => scope.me, (newValue: any) => {
                    if (scope.me) {
                        //map.addPosition(scope.me.coords.longitude, scope.me.coords.latitude);
                        map.centerOnPosition(scope.me.coords.longitude, scope.me.coords.latitude);
                    }
                });

                scope.$watch(() => scope.users, () => {
                    if (scope.users) {
                        scope.users.forEach((u: any) => {
                            map.addPosition(u.longitude, u.latitude, 'yellow');
                        });
                    }
                });

                //scope.$watch(() => scope.selectedCountry, () => {
                //    if (scope.selectedCountry && scope.selectedCountry.name) {
                //        console.log('reading states');
                       
                //    }
                //});

                scope.$watch(() => scope.states, () => {
                    if (scope.states) {
                        console.log(scope.states);
                        map.drawStates(scope.states, 'pink');
                    }
                });

            } catch (e) {
                console.log(e);
            }
            scope.isLoading = false;
        }
    };
}