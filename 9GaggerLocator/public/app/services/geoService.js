/// <reference path="../../../typings/geojson/geojson.d.ts" />
var app;
(function (app_1) {
    var Services;
    (function (Services) {
        var geoService = (function () {
            function geoService($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            geoService.prototype.getCountries = function () {
                var defered = this.$q.defer();
                this.$http.get('api/countries')
                    .success(function (data) {
                    //topojson format
                    defered.resolve(data);
                })
                    .error((function (reason) {
                    defered.reject(reason);
                }));
                return defered.promise;
            };
            geoService.prototype.getGeoJSON = function (topojsonObjects) {
                var geo = topojson.feature(topojsonObjects, topojsonObjects.objects.countries);
                //var geo = [];
                return geo;
            };
            geoService.prototype.getCountry = function (countryName) {
                var _this = this;
                var defered = this.$q.defer();
                this.getCountries().then(function (data) {
                    var geo = _this.getGeoJSON(data);
                    var country = _.find(geo.features, function (f) { return f.properties.name === countryName; });
                    defered.resolve(country);
                });
                return defered.promise;
            };
            geoService.prototype.findMe = function () {
                var defered = this.$q.defer();
                navigator.geolocation.getCurrentPosition(function (position) {
                    //self.user.latitude = position.coords.latitude;
                    //self.user.longitude = position.coords.longitude;
                    //var country = self.mapService.getCountry(self.user.longitude, self.user.latitude);
                    //if (country) {
                    //    self.user.country = country.properties.name;
                    //}
                    defered.resolve(position);
                }, function (reason) {
                    defered.reject(reason);
                });
                return defered.promise;
            };
            geoService.serviceId = 'geoService';
            return geoService;
        })();
        var app = angular.module('app');
        app.factory(geoService.serviceId, [
            '$http', '$q',
            function ($http, $q) {
                return new geoService($http, $q);
            }
        ]);
    })(Services = app_1.Services || (app_1.Services = {}));
})(app || (app = {}));
//# sourceMappingURL=geoService.js.map