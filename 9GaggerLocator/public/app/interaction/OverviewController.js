/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var message = (function () {
            function message() {
            }
            return message;
        })();
        var OverviewController = (function () {
            function OverviewController(userService, geoService, identityService, realTimeService, notifierService) {
                this.geoService = geoService;
                this.identityService = identityService;
                this.realTimeService = realTimeService;
                this.notifierService = notifierService;
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
            OverviewController.prototype.selectCountry = function (countryName) {
                var _this = this;
                this.geoService.getStates(countryName).then(function (data) {
                    _this.states = data;
                });
                //this.geoService.getCountry(countryName)
                //    .then((country: any) => {
                //        if (country) {
                //            console.log('country selected');
                //            this.selectedCountry = country;
                //        }
                //    },(reason) => {
                //        console.error(reason);
                //    });
                //this.geoService.getStates(scope.selectedCountry.name)
                //    .then((data) => {
                //    console.log('promise resolved');
                //    console.log(data);
                //    this._states = data;
                //}, (reason) => {
                //        console.error(reason);
                //    });
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
            OverviewController.prototype.nearMe = function () {
                this.position = {
                    coords: {
                        longitude: this.identityService.currentUser.longitude,
                        latitude: this.identityService.currentUser.latitude
                    }
                }; //this.identityService.currentUser
                //this.geoService.findMe().then((position) => {
                //    this.position = position;
                //}, (reason: any) => {
                //    this.notifierService.error(reason);
                //});
            };
            OverviewController.prototype.sameCountry = function (user) {
                return user.country === this.identityService.currentUser.country;
            };
            return OverviewController;
        })();
        angular.module('app').controller('OverviewController', [
            'userService',
            'geoService',
            'identityService',
            'realTimeService',
            'notifierService',
            OverviewController
        ]);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=OverviewController.js.map