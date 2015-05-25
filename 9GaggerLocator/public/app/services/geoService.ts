/// <reference path="../../../typings/geojson/geojson.d.ts" />
/// <reference path="../../scripts/topojson.d.ts" />
module app.Services {
    export interface IgeoService {
        getCountries(): ng.IPromise<TopoJSON.TopoJSONObject>;
        getGeoJSON(topojsonObjects: any): GeoJSON.FeatureCollection;
        getCountry(countryName: string): ng.IPromise<any>;
        getStates(countryName: string): ng.IPromise<Array<GeoJSON.Feature>>;
        findMe(): ng.IPromise<Position>;
    }

    class geoService implements IgeoService {
        static serviceId='geoService';

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        getCountries(): ng.IPromise<TopoJSON.TopoJSONObject> {
            var defered = this.$q.defer();
            this.$http.get('api/countries')
                .success((data: any) => {
                    //topojson format
                    defered.resolve(data);
                })
                .error(((reason: any) => {
                    defered.reject(reason);
                }));
            return defered.promise;
        }

        getGeoJSON(topojsonObjects: any): GeoJSON.FeatureCollection {
            var geo = topojson.feature(topojsonObjects, topojsonObjects.objects.countries);
            //var geo = [];
            return geo;
        }

        getCountry(countryName: string): ng.IPromise<any> {
            var defered = this.$q.defer();
            this.getCountries().then((data) => {
                var geo = this.getGeoJSON(data);
                var country = _.find(geo.features, (f: any) => f.properties.name === countryName);
                defered.resolve(country);
            });
            return defered.promise;
        }

        findMe(): ng.IPromise<Position> {
            var defered = this.$q.defer();
            navigator.geolocation.getCurrentPosition((position) => {
                //self.user.latitude = position.coords.latitude;
                //self.user.longitude = position.coords.longitude;
                //var country = self.mapService.getCountry(self.user.longitude, self.user.latitude);
                //if (country) {
                //    self.user.country = country.properties.name;
                //}
                defered.resolve(position);
            }, (reason) => {
                defered.reject(reason);
            });
            return defered.promise;
        }

        getStates(countryName: string): ng.IPromise<Array<GeoJSON.Feature>> {
            var defered = this.$q.defer();
            var request: ng.IRequestConfig = {
                method: 'GET',
                url: '/api/states',
                params: {
                    name:countryName
                }
            };
            this.$http(request).success((data: Array<any>, status, error, config) => {
                console.log('resolving promise');
                defered.resolve(data);
            }).error((data: Array < any >, status, error, config) => {
                defered.reject(error);
            });

            return defered.promise;
        }

    }

    var app = angular.module('app');
    app.factory(geoService.serviceId, [
        '$http', '$q',
        ($http: any, $q: any) =>
        new geoService($http, $q)
    ]);
}