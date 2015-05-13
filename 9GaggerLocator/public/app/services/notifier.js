/// <reference path="../../../typings/toastr/toastr.d.ts" />
var app;
(function (app) {
    var Services;
    (function (Services) {
        var notificationService = (function () {
            function notificationService(toastr) {
                this.toastr = toastr;
                if (!this._notificationList) {
                    this._notificationList = [];
                }
            }
            notificationService.prototype.notificationList = function () {
                return this._notificationList;
            };
            notificationService.prototype.debug = function (message) {
                this.toastr.info(message);
                console.debug(message);
                this.pushNotification('DEBUG', message);
            };
            notificationService.prototype.success = function (message) {
                this.toastr.success(message);
                console.log(message);
                this.pushNotification('SUCCESS', message);
            };
            notificationService.prototype.error = function (message) {
                this.toastr.error(message);
                console.error(message);
                this.pushNotification('ERROR', message);
            };
            notificationService.prototype.warning = function (message) {
                this.toastr.warning(message);
                console.warn(message);
                this.pushNotification('WARNING', message);
            };
            notificationService.prototype.pushNotification = function (severity, message) {
                this._notificationList.push({
                    time: new Date().toLocaleTimeString(),
                    severity: severity,
                    message: message
                });
            };
            notificationService.serviceId = 'notifierService';
            return notificationService;
        })();
        angular.module('app').value('toastr', toastr);
        angular.module('app').factory(notificationService.serviceId, ['toastr', function (toastr) { return new notificationService(toastr); }]);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
//# sourceMappingURL=notifier.js.map