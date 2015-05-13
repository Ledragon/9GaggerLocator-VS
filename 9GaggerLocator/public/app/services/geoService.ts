/// <reference path="../../../typings/geojson/geojson.d.ts" />

module app.Services {
    export interface IgeoService {
        getCountries(): ng.IPromise<TopoJSON.TopoJSONObject>;
        getGeoJSON(topojsonObjects: any): GeoJSON.FeatureCollection;
        getCountry(countryName: string): ng.IPromise<any>;
        findMe(): ng.IPromise<Position>;
    }

    class geoService implements IgeoService {
        public static serviceId='geoService';

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        public getCountries(): ng.IPromise<TopoJSON.TopoJSONObject> {
            var defered = this.$q.defer();
            this.$http.get('api/countries')
                .success((data) => {
                    //topojson format
                    defered.resolve(data);
                })
                .error(((reason) => {
                    defered.reject(reason);
                }));
            return defered.promise;
        }

        public getGeoJSON(topojsonObjects: any): GeoJSON.FeatureCollection {
            var geo = topojson.feature(topojsonObjects, topojsonObjects.objects.countries);
            //var geo = [];
            return geo;
        }

        public getCountry(countryName: string): ng.IPromise<any> {
            var defered = this.$q.defer();
            this.getCountries().then((data) => {
                var geo = this.getGeoJSON(data);
                var country = _.find(geo.features, (f: any) => f.properties.name === countryName);
                defered.resolve(country);
            });
            return defered.promise;
        }


        public findMe():ng.IPromise<Position> {
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
    }

    var app = angular.module('app');
    app.factory(geoService.serviceId, [
        '$http', '$q',
        ($http, $q) =>
        new geoService($http, $q)
    ]);
}