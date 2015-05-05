/// <reference path="../../../typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    var Services;
    (function (Services) {
        var realTimeService = (function () {
            function realTimeService(identityService) {
                this.identityService = identityService;
                if (!this._socket) {
                    this._socket = io();
                }
            }
            realTimeService.prototype.emit = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                this._socket.emit(event, this.identityService.currentUser.username, args);
            };
            realTimeService.prototype.on = function (event, callback) {
                this._socket.on(event, callback);
            };
            realTimeService.serviceId = 'realTimeService';
            return realTimeService;
        })();
        angular.module('app').factory(realTimeService.serviceId, [
            'identityService',
            function (identityService) { return new realTimeService(identityService); }
        ]);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
//# sourceMappingURL=realTimeService.js.map