/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (_app) {
    var Controllers;
    (function (Controllers) {
        var message = (function () {
            function message() {
            }
            return message;
        })();
        var OverviewController = (function () {
            function OverviewController(userService, geoService, identityService, realTimeService) {
                this.identityService = identityService;
                this.realTimeService = realTimeService;
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
                this.realTimeService.on('message-sent', function () {
                    toastr.success('yay');
                });
            }
            OverviewController.prototype.flag = function (isoA2) {
                if (isoA2) {
                    return "flag-icon-" + isoA2.toLowerCase();
                }
            };
            OverviewController.prototype.sendTo = function (user) {
                this._message = new message();
                this._message.from = this.identityService.currentUser;
                this._message.to = user;
            };
            OverviewController.prototype.send = function () {
                this._message.title = this.messageTitle;
                this._message.content = this.messageContent;
                this.realTimeService.emit('message-sent', this._message);
            };
            return OverviewController;
        })();
        var app = angular.module('app');
        app.controller('OverviewController', ['userService', 'geoService', 'identityService', 'realTimeService', OverviewController]);
    })(Controllers = _app.Controllers || (_app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=OverviewController.js.map