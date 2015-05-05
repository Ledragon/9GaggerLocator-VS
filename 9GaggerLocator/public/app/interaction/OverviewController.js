/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/socket.io-client/socket.io-client.d.ts" />
var app;
(function (app_1) {
    var Controllers;
    (function (Controllers) {
        var OverviewController = (function () {
            function OverviewController(userService, geoService) {
                var self = this;
                userService.getAll().then(function (data) {
                    self.users = data;
                    self.users.forEach(function (u) {
                        if (u.country) {
                            geoService.getCountry(u.country).then(function (country) {
                                if (country) {
                                    u.countryIsoA2 = country.properties.iso_a2;
                                }
                            });
                        }
                    });
                });
                //this._socket = io.connect('http://localhost:3030/');
            }
            OverviewController.prototype.flag = function (isoA2) {
                if (isoA2) {
                    return "flag-icon-" + isoA2.toLowerCase();
                }
            };
            OverviewController.prototype.sendMessage = function () {
                var message = 'a message has been sent';
                console.log(message);
            };
            return OverviewController;
        })();
        var app = angular.module('app');
        app.controller('OverviewController', ['userService', 'geoService', OverviewController]);
    })(Controllers = app_1.Controllers || (app_1.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=OverviewController.js.map